<template>
<div class="row justify-center items-center content-center alarm-row">
  <div class="col col-6 col-md-6 col-lg-3 col-xs-10 alarm-container">
    <q-chip color="red" class="status">
      Unarmed
    </q-chip>
    <h3>****</h3>
    <div class="row">
      <div class="col col-4 number">
        <q-btn big round flat>1</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>2</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>3</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>4</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>5</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>6</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>7</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>8</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>9</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat color="teal">Partial Arm</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat>0</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat color="teal">Arm</q-btn>
      </div>
    </div>
  </div>
</div>
</template>


<style lang="stylus" scoped>
@import '~variables'

.status
  position absolute
  top -10px
  right 20px

.alarm-row
  position absolute
  overflow hidden
  top 0
  bottom 0
  right 0
  left 0

.alarm-container
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  position relative
  padding 0

  h3
    color white
    font-weight 200
    width 100%
    text-align center
    line-height 75%
    position relative
    top 30px
    margin-top 10px

  .number
    font-size 36px
    text-align center
    padding 10px 0px 10px 0px
    color white


</style>
