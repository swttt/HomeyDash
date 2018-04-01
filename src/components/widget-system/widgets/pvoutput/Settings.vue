<template>
  <div class="col-12">
    <q-list no-border>
      <q-item tag="label">
        <q-item-main>
          <q-input dark v-model="widget.settings.apikey" type="text" stack-label="API Key (read only)" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-input dark v-model="widget.settings.systemid" type="text" stack-label="System ID" />
        </q-item-main>
      </q-item>
      <q-item class="label">
        <q-item-main label="Number formatting" />
        <q-item-side right>
          <q-btn-toggle
            v-model="widget.settings.numberformat"
            toggle-color="teal"
            @input="emptySetting"
            :options="[
              {label: '1,000.00', value: 'us'},
              {label: '1.000,00', value: 'other'}
            ]"
          />
        </q-item-side>
      </q-item>
      <q-list-header>Details to show</q-list-header>
        <q-item tag="label">
          <q-item-main>
            <q-item-tile label>Show Current Generation</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showCurrentGeneration" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-item-tile label>Show Today Generation</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showTodayGeneration" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-item-tile label>Show Week Generation</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showWeekGeneration" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-item-tile label>Show Lifetime Generation</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showLifetimeGeneration" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
              <q-item-tile label>Show Current Consumption</q-item-tile>
          </q-item-main>
          <q-item-side right>
              <q-toggle dark v-model="widget.settings.showCurrentConsumption" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-item-tile label>Show Today Consumption</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showTodayConsumption" color="teal" />
          </q-item-side>
        </q-item>
      </q-list>
      <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
  </div>
</template>

<script>
export default {
  props: ['widget'],
  emptySetting () {
    this.widget.settings.crypto = []
  }
}
</script>

<style lang="stylus">
    .q-list label
        padding-left: 0 !important
</style>
