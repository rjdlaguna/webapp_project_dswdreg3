<template>
    <div class="container pb-4">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto" id = "reg_center">
                <h1 class="h3 mb-3 font-weight-normal">Add Center or Institution</h1>
                <form>
                    <div class="form-group">
                        <label for="center_name">Center or Institution Name</label>
                        <input type="text" v-model="center_name" class="form-control" id="center_name" name="center_name" placeholder="Enter Name of Center or Institution" >
                        <span></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>