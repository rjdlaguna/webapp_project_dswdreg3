<template>
  <div class="container pb-4">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto" id = "regform">
        <form @submit.prevent="registerUser">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <p id = "note_regform">Note: Mark with (<span class = 'required_data'>*</span>) are required.</p>
          <div class="form-group">
            <label for="first_name">First Name<span class = 'required_data'>*</span></label>
            <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Enter First Name">
          </div>
          <div class="form-group">
            <label for="middle_initial">Middle Initial</label>
            <input type="text" v-model="middle_initial" class="form-control" name="middle_initial" placeholder="Enter Middle Initial">
          </div>
          <div class="form-group">
            <label for="last_name">Last Name<span class = 'required_data'>*</span></label>
            <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Enter Last Name">
          </div>
          <div class="form-group">
            <label for="mobilephone_no">Mobile Phone No.<span class = 'required_data'>*</span></label>
            <input type="text" v-model="mobile_no" class="form-control" name="mobile_no" placeholder="09xx3456789" />
            
          </div>
          <div class="form-group">
            <label for="birthdate">Birthdate<span class = 'required_data'>*</span></label>
             <input type="date" v-model="birthdate" class="form-control" name="birthdate" placeholder="">
          </div>
          <div class="form-group">
            <label for = "address">Address<span class = 'required_data'>*</span></label>
              <input ref="autocomplete"
                placeholder="Type Your Address"
                class="form-control"
                onfocus="value = ''"
                type="text"
                name="address"
                v-model="user_address"/>
          </div>
          <div class="form-group">
            <label for="email">Email Address<span class = 'required_data'>*</span></label>
            <input type="text" v-model="email" class="form-control" name="email" placeholder="Enter Email">
          </div>
          <div class="form-group">
            <label for="password">Password<span class = 'required_data'>*</span></label>
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
          </div>
          <div class="form-group">
            <label for="password">Confirm Password<span class = 'required_data'>*</span></label>
            <input type="password" v-model="confirm_password" class="form-control" name="confirm_password" placeholder="Confirm Password">
          </div>
          <div class = "col text-center">
            <button class="btn btn-lg btn-primary btn-inline" type="submit">Register</button>
            <button class="btn btn-lg btn-primary btn-inline" type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
