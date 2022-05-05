const Question = require('../../database/models/question');
const skip = require('../queries/skip');
const mongoose = require("mongoose");

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
                    questions: {$push: '$data'},
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
                $project: {
                    _id: 0
                }
            }
        ]

        let questions = await Question.aggregate(pipeline);

        if (questions.length) {
            return res.status(200).send(questions);
        }
        return res.sendStatus(204);
    }

    async function post(req, res) {
        return res.sendStatus(200);
    }
}