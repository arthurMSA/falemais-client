<template>
  <div class="index">
    <div class="q-ml-lg text-color">
      <p class="text-h6">Ainda não pussue o plano FaleMais?</p>
      <p class="text-subtitle2">Se a resposta é SIM, calcule quanto iria economizar utilizando este plano</p>
    </div>
    <q-form @submit="calculate">
      <div class="row justify-around q-mb-md">
        <div class="col-5">
          <select-region
            :rule-required="true"
            name="teste"
            @input="originRegion = $event"
            :options="regions"
            option-label="name"
            label="Origem ligação(DDD)"
          />
        </div>
        <div class="col-5">
          <select-region
            :rule-required="true"
            @input="destinationRegion = $event"
            :options="regions"
            option-label="name"
            label="Destino ligação(DDD)"
          />
        </div>
      </div>
      <div class="row justify-around">
        <div class="col-5 q-mb-md">
          <input-minutes
            :rule-required="true"
            mask="####"
            label="Tempo de ligação (Minutos)"
            @input="minutes = $event"
          />
        </div>
        <div class="col-5 ">
          <q-btn
            type="submit"
            color="teal-4" 
            class="full-width full-heigth" 
            text-color="white"
          >
            CALCULAR
          </q-btn>
        </div>
      </div>
    </q-form>
    <p class="text-negative" v-if="resultError">{{error}}</p>
    <q-table
      v-else-if="table.data.length > 0"
      :data="table.data"
      :columns="table.columns"
      row-key="name"
      dense
      flat
      hide-bottom
    />
  </div>
</template>

<script src="./script.js"/>

    