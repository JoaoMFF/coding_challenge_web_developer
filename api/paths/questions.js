const Question = require('../../database/models/question');
const skip = require('../queries/skip');
const mongoose = require('mongoose');

module.exports = function () {
    return {
        get,
        post,
    };

    async function get(req, res) {
        let pipeline = []
        let limit = req.query.limit;

        if (req.query.id) {
            pipeline.push({
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.id)
                }
            });
        }

        pipeline = [
            ...pipeline,
            {
                $group: {
                    _id: null,
                    data: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            email: "$email",
                            observations: "$observations",
                            date: "$date",
                            created_at: "$created_at",
                        }
                    },
                    total: {
                        $sum: 1
                    }
                }
            },
            {
                $unwind: "$data"
            },
            {
                $sort: {
                    "data.created_at": -1
                }
            },
            {
                $skip: skip(req.query)
            },
            {
                $limit: limit
            },
            {
                $group: {
                    _id: null,
                    questions: {$push: "$data"},
                    totalQuestions: {
                        $first: {
                            $ifNull: ["$total", 0]
                        }
                    },
                    totalResults: {
                        $first: {
                            $cond: [
                                {
                                    $gte: ["$total", limit]
                                },
                                limit,
                                "$total"
                            ]
                        }
                    },
                    currentPage: {
                        $first: req.query.page
                    },
                    skip: {
                        $first: skip(req.query)
                    }
                }
            },
            {
                $addFields: {
                    lastPage: {
                        $ceil: {
                            $divide: ["$totalQuestions", "$totalResults"]
                        }
                    }
                }
            }
        ]

        let questions = await Question.aggregate(pipeline);

        if (questions.length) {
            return res.status(200).send(questions[0]);
        }
        return res.sendStatus(204);
    }

    async function post(req, res) {
        let date = new Date(req.body.date);
        let oneDay = 1000 * 60 * 60 * 24
        let dateTomorrow = new Date(new Date().getTime() + oneDay);

        // set dayAfterTomorrow at midnight
        dateTomorrow.setMilliseconds(999);
        dateTomorrow.setSeconds(59);
        dateTomorrow.setMinutes(59);
        dateTomorrow.setHours(23);

        if (date < dateTomorrow) {
            return res.status(400).send('The date must greater than the date of the following date!');
        }

        const question = new Question({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            observations: req.body.observations,
            date: new Date(req.body.date),
            created_at: new Date(),
        });

        try {
            await question.save();
        } catch (e) {
            console.error(e);
            throw new Error('Error saving question!');
        }

        return res.status(201).json({id: question._id.toString()})
    }
}