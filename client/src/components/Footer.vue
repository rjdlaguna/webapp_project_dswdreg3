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
*,
*::before,
*::after{
	margin: 0;
	padding: 0;
	box-sizing: 0;
}
.footer{
    background: #042331;
    color:wheat;
    text-align: center;
    bottom: 0;
    left: 0;
    width: 100%;
    display: block;
    margin-top: 1em;
    padding: 2rem;
}
@media (max-width:414px){
  .title-caption{
    margin-top: 620px
  }
}
</style>
