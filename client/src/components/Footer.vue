<template>
    <footer class = "footer" >
        <p> {{title}} </p>
        <p> {{developer}} </p>
    </footer>
</template>

<script>
export default {
  data () {
    return {
      title: 'COPYRIGHTS RESERVED 2019',
      developer: 'DEVELOPED BY: RENE LAGUNA JR.'
    }
  }
}
</script>

<style scoped>
.footer{
    background: #042331;
    color:wheat;
    text-align: center;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    width: 100%;
    height: 100%;
    grid-row-start: 2;
    grid-row-end: 3;
    position: inherit;
    margin-top:9em;
}
</style>
