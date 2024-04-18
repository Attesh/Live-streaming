<template>
	<div>
		 <slot></slot>

		 <table class="table table-bordered">
		 	<thead>
		 		<tr>
		 			<th class="table-site-headings" scope="col">S No.</th>
		 			<th class="table-site-headings" scope="col" :key="fieldIndex" v-for="(field,fieldIndex) in fields">{{field.label}}</th>
		 			<th v-if="action" class="table-site-headings" scope="col">Action</th>
		 		</tr>
		 	</thead>
		 	<tbody>
		 		<template v-if="!hasPagination">
		 			<tr :key="itemIndex" v-for="(item,itemIndex) in data">
		 				<th scope="row">{{itemIndex + 1}}</th>
		 				<td :key="fieldIndex" v-for="(field,fieldIndex) in fields">{{field.format?field.format(data[itemIndex][field.key]):data[itemIndex][field.key]}}</td>
		 				<slot name="extra-cells" v-bind="item"></slot>
		 			
		 			</tr>
		 			<NoRecord tag="tr" :data="data" :colspan="colspanFields" />
		 		</template>
		 		<template v-if="hasPagination">
		 			<tr class="tableRow" :key="itemIndex" v-for="(item,itemIndex) in data?.data?.data">
		 				<td>{{serialNumber(data,itemIndex)}}</td>
		 				<td :key="fieldIndex" v-for="(field,fieldIndex) in fields">{{field.format?field.format(data.data.data[itemIndex][field.key]):data.data.data[itemIndex][field.key]}}</td>
		 				<slot name="extra-cells" v-bind="item"></slot>
		 			</tr>
		 			<NoRecord tag="tr" :data="data?.data" :colspan="colspanFields" />
		 		</template>
		 	</tbody>
		 </table>

		 <div v-if="hasPagination" class="row align-items-center  my-md-3 p-md-3 p-2 table-responsive">
		 	<div class="col-lg-5 col-sm-12 col-md-12">
		 		<div class="pagination-details">Showing {{ data?.data?.per_page }} out of {{ data?.data?.total }} records</div>
		 	</div>
		 	<div class="col-lg-7 col-sm-12 col-md-12">
		 		<nav aria-label="Page navigation example">
		 			<Pagination :pagination="data?.data"class="page-item" :callback="changePage" :visible="1"></Pagination>
		 		</nav>
		 	</div>
		 </div>
	</div>
</template>
<script>
import Pagination from 'vue-laravel-pagination';
import NoRecord from '@components/admin/Core/NoRecord.vue';
export default {
    props: {
        fields: {
            type: Array,
            default: () => ([]),
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        hasPagination: {
            type: Boolean,
            default: true,
        },
        action : {
            type : Boolean,
            default : true,
        }
    },
    created(){
    	console.log(this.data)
    },
    components : {
		NoRecord,
		Pagination
    },
    computed: {
        colspanFields() {
            return Object.keys(this.fields).length + 2;
        },
    },
    methods: {
        changePage(page = 1) {
        	console.log()
            this.$emit('page-changed', page);
        },
        serialNumber(variable, index = 0)  {
	      let starting = variable?.data?.per_page * (variable?.data?.current_page - 1);
	      index++;

	      return starting + index;
	    }
    },
}

</script>