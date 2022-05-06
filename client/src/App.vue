<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark ">
      <!-- Container wrapper -->
      <div class="container-fluid">

        <!-- Navbar brand -->
        <router-link class="navbar-brand"  to="/" >Questions</router-link>

        <!-- Toggle button -->
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <!-- Link -->
            <li class="nav-item">
              <router-link to="/questions" class="nav-link">Add</router-link>
            </li>

          </ul>

        </div>
      </div>
      <!-- Container wrapper -->
    </nav>

    <div class="container mt-5">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
