import SelectRegion from '../../components/select'
import InputMinutes from '../../components/input'
export default {
  components: {
    SelectRegion,
    InputMinutes
  },
  data: () => ({
    show: false,
    regions: [],
    originRegion: '',
    destinationRegion: '',
    minutes: 0,
    error: '',
    resultError: false,
    table: {
      columns: [
        {
          name: 'name',
          field: 'name',
          label: 'Plano',
          align: 'left',
          sortable: true
        },
        {
          name: 'withPlan',
          field: 'withPlan',
          format: val => parseFloat(val.toFixed(2)).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          }),
          label: 'Com FaleMais',
          align: 'center',
          sortable: true
        },
        {
          name: 'withoutPlan',
          field: 'withoutPlan',
          format: val => parseFloat(val.toFixed(2)).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          }),
          label: 'Sem FaleMais',
          align: 'center',
          sortable: true
        },
      ],
      data: []
    }
  }),
  created() {
    this.getRegions()
  },
  methods: {
    async calculate() {
      let query = `origin=${this.originRegion['ddd']}&destination=${this.destinationRegion['ddd']}&time=${this.minutes}`
      let resultCalculation = await this.$axios.get('https://aramo-api.herokuapp.com/api/plan/calculate?'+query)
      this.resultError = resultCalculation.data.error
      if(resultCalculation.data.error) {
        this.error = resultCalculation.data.message
      } else {
        this.table.data = resultCalculation.data.data
      }
    },
    async orderNames(plans) {
      this.table
    },
    async getRegions() {
          let regions = await this.$axios.get('https://aramo-api.herokuapp.com/api/region')
          .then(res => res.data)
          .catch(error => console.error(error))
      regions.forEach(region => {
        region['name'] = `${region['name']} (${region['ddd']})`
      })
      this.regions = regions
    }
  },
}