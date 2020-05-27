<template>
<div id="addForm" class="container">
  <div class="alert alert-warning">
    <p class="text-center">
      AJAX is disabled in this demo.
    </p>
  </div>

  <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="handleSubmit($event);">
    <div class="row">
      <div class="col-md-4">
        <div class="form-group label-floating">
          <label class="control-label">Name</label>
          <input type="text" class="form-control" v-model="name">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group label-floating">
          <label class="control-label">Alias</label>
          <input type="text" class="form-control" v-model="alias">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group label-floating">
          <label class="control-label">Sex</label>
          <select class="form-control" v-model="sex" id="level">
            <option value="Male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row" v-for="(book, index) in sez" :key="index">
      <div class="col-md-4">
        <div class="form-group label-floating">
          <label class="control-label">Date</label>
          <input type="date" class="form-control" v-model="book.date">
        </div>
      </div>
      <div class="col-md-8">
        <div class="form-group label-floating">
          <label class="control-label">Details</label>
          <input type="text" class="form-control" v-model="book.details">
        </div>
      </div>
    </div>
    <a @click="addNewRow">Add sez</a>

    <div class="card-content">
      <div class="row">
        <div class="col-md-4">
          <div class="button success expand radius">
            <span id="save_image_titlebar_logo_live">Signature</span>
            <label class="custom-file-upload">
              <input type="file" name="photo" accept="image/*">
            </label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="button success expand radius">
            <span id="save_image_titlebar_logo_live2">Recent Photograph</span>
            <label class="custom-file-upload">
              <input type="file" name="sign" accept="image/*">
            </label>
          </div>
        </div>
        <div class="col-md-4">
          <ul class="list-group" :if="images.length">
            <li class="list-group-item" v-for="(f, index) in images" :key="index">
              <button class="close" @click.prevent="removeImage(index, $event)">&times;</button>
              <div class="button success expand radius">
                <label class="custom-file-upload">
                  <input type="file" class="images[]" accept="image/*" @change="previewImage(index, $event)">
                </label>
              </div>
              <div :class="'images[' + index + ']-preview image-preview'"></div>
            </li>
          </ul>
          <button class="btn btn-link add-image" @click.prevent="addNewImage">Add Image</button> (max 2 in this demo)
        </div>
      </div>
    </div>
  </form>

  <div class="alert alert-info">
    <p class="text-center">
      Thanks for testing! =)
      &mdash; <a href="https://stackoverflow.com/users/9217760/sally-cj" target="_blank">Sally</a>
    </p>
  </div>
</div>
</template>
<script>
export default {
addForm = new Vue({
  el: "#addForm",
  data: {
    name: '',
    alias: '',
    sex: '',
    sez: [{
      date: null,
      details: null
    }],
    // I removed `photo` and `sign` because (I think) the're not necessary.
    // Add I added `images` so that we could easily add new images via Vue.
    images: [],
    maxImages: 2,
    // Selector for the "Add Image" button. Try using (or you should use) ID
    // instead; e.g. `button#add-image`. But it has to be a `button` element.
    addImage: 'button.add-image'
  },
  methods: {
    addNewRow: function() {
      // I changed to `this.sez.push` because `this.seziure` is `undefined`.
      this.sez.push({
        date: null,
        details: null
      });
    },

    addNewImage: function(e) {
      var n = this.maxImages || -1;
      if (n && this.images.length < n) {
        this.images.push('');
      }
      this.checkImages();
    },

    removeImage: function(index) {
      this.images.splice(index, 1);
      this.checkImages();
    },

    checkImages: function() {
      var n = this.maxImages || -1;
      if (n && this.images.length >= n) {
        $(this.addImage, this.el).prop('disabled', true);  // Disables the button.
      } else {
        $(this.addImage, this.el).prop('disabled', false); // Enables the button.
      }
    },

    previewImage: function(index, e) {
      var r = new FileReader(),
        f = e.target.files[0];

      r.addEventListener('load', function() {
        $('[class~="images[' + index + ']-preview"]', this.el).html(
          '<img src="' + r.result + '" class="thumbnail img-responsive">'
        );
      }, false);

      if (f) {
        r.readAsDataURL(f);
      }
    },

    handleSubmit: function(e) {
      var vm = this;

      var data = new FormData(e.target);
      data.append('sez', this.sez);
      data.append('name', this.name);
      data.append('alias', this.alias);
      data.append('sex', this.sex);

      // The `data` already contain the Signature and Recent Photograph images.
      // Here we add the extra images as an array.

      $('[class~="images[]"]', this.el).each(function(i) {
        if (i > vm.maxImages - 1) {
          return; // Max images reached.
        }

        data.append('images[' + i + ']', this.files[0]);
      });

      alert('Sorry, AJAX is disabled');
/*
      $.ajax({
        url: 'http://localhost:4000/save/',
        data: data,
        type: 'POST',
        dataType: 'json',
        success: function(e) {
          if (e.status) {
            vm.response = e;
            alert("success");
          } else {
            vm.response = e;
            console.log(vm.response);
            alert("Registration Failed");
          }
        },
        cache: false,
        contentType: false,
        processData: false
      });
*/

      return false;
    },
  },
})
}
</script>
<style>

</style>