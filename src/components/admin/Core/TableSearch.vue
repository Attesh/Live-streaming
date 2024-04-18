<template>
    <div class="row justify-content-between">
            <div class="col-md-12 mb-3">
                <div v-if="showDateRanges" class="filterOption">
                    <div class="title">
                        <h3 class="h5 achivpFont">Sort By:</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div v-if="showDateRanges" class="d-flex align-items-center flex-wrap mb-3">
                    <div class="dateBox d-flex align-items-center gap-15">
                        <p class="mb-0 achivpFont">Form:</p>
                        <div class="flex-grow-1">
                            <div class="form-group">
                                <div class="input-group date" id="datetimepicker7" data-target-input="nearest">
                                    <input type="date" v-model="dateFrom" class="form-control datetimepicker-input" data-target="#datetimepicker7" />
                                </div>
                            </div>
                        </div>
                        -
                        <div class="flex-grow-1">
                            <div class="form-group">
                                <div class="input-group date" id="datetimepicker8" data-target-input="nearest">
                                    <input type="date" v-model="dateTill" class="form-control datetimepicker-input" data-target="#datetimepicker8" />
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <div class="form-group">
                                <div class="input-group date" id="datetimepicker8" data-target-input="nearest">
                                    <button @click="updateDates" class="btn">Apply</button>  
                                </div>
                            </div>
                        </div>
                         <div class="flex-grow-1">
                            <div class="form-group">
                                <div class="input-group date" id="datetimepicker8" data-target-input="nearest">
                                    <button @click="resetFilter" class="btn">Reset</button>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- entries -->
                <div v-if="showEntries" class="selectBox">
                    <div class="grapSelect d-flex gap-15 align-items-center flex-wrap flex-lg-nowrap">
                        <p class="mb-0 achivpFont">Show:</p>
                        <select v-model="entries" class="form-select form-select-sm pr-5 py-2 w-auto" aria-label=".form-select-sm example">
                            <option value="" disabled>Record Per Page</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <p class="mb-0">Entries</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div v-if="showStatus" class="d-flex align-items-center flex-wrap selectBox gap-15 mb-4">
                    <div class="title flex-shrink-0">
                        <p class="achivpFont mb-0">Filter By:</p>
                    </div>
                    <div class="filterField flex-grow-1">
                        <select v-model="status" class="form-select form-select-sm pr-5 py-2" aria-label=".form-select-sm example">
                            <option value="">Select Status</option>
                            <option :key="statusIndex" v-for="(status,statusIndex) in statuses" :value="status.value">{{status.label}}</option>
                            <!-- <option value="0">Inactive</option> -->
                        </select>
                    </div>
                </div>
                <div class="userSeach input-group w-auto">
                    <input v-model="searchValue" class="form-control w-50 py-2 border-right-0 border" type="search" placeholder="Search..." id="example-search-input">
                </div>
            </div>
        </div>
    <!-- <div class="d-flex align-items-end col-md-12 col-sm-12">
        <div  class="col-sm-12 col-md-6">
            <div v-if="showEntries" class="dataTables_length" id="DataTables_Table_0_length">
                <label class="d-flex">Show
                    <select v-model="entries" name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-control form-control-sm w-50">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select> entries
                </label></div>
        </div>
        <div class="col-md-6 col-sm-12">
            <div id="DataTables_Table_0_filter" class="dataTables_filter for-search w-100">
                <label>Search:<input v-model="searchValue" spellcheck="true" type="search" class="form-control form-control-sm" :placeholder="placeholder" aria-controls="DataTables_Table_0"></label>
            </div>
        </div>
    </div> -->
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    props: {
        placeholder: {
            type: String, // String, Number, Boolean, Function, Object, Array
            required: false,
            default: 'Search...'
        },
        showEntries: {
            type: Boolean, // String, Number, Boolean, Function, Object, Array
            required: false,
            default: true,
        },
        showStatus : {
                type: Boolean, // String, Number, Boolean, Function, Object, Array
                required: false,
                default: false,   
        },
        showDateRanges : {
            type: Boolean, // String, Number, Boolean, Function, Object, Array
            required: false,
            default: false,   
        },
        statuses : {
            type : Array,
            default  : ()=> ([{
                label : 'Active',
                value : 1,
            },{
                label : 'Inactive',
                value : 0,
            }]),
        },
    },
    data() {
        return {
            searchValue: '',
            entries : 10,
            fromDateCheck: false,
            tillDateCheck:false,
            dateFrom: '',
            dateTill: '',
            status : '',
        };
    },
    watch: {
        searchValue: function(val, oldVal) {
            this.handleSearch();
        },
        entries(val){
            this.$emit('on-change-entries',val);
            // this.SET_ENTRIES(val);
        },
        status(val){
            
            this.$emit('on-change-status',val);
        },
        /* dateTill(val, oldVal){
            if(val.length > 0){
                this.tillDateCheck = true;
                if(this.fromDateCheck){
                    this.$emit('on-change-date-to',val);
                    this.$emit('on-change-date-from',this.dateFrom);
                }
            }else{
                this.tillDateCheck = false;
            }
        },
        
        dateFrom(val, oldVal){
            
            if(val.length > 0){
                this.fromDateCheck = true;
                if(this.tillDateCheck){
                    // this.fetch();                   
                    this.$emit('on-change-date-to',this.dateTill);
                    this.$emit('on-change-date-from',val);
                }
            }else{
                this.fromDateCheck = false;
            }
        } */
    },
    created() {
        this.handleSearch = _.debounce(this.handleSearch, 500);
    },
    computed: {
        // ...mapState('admin',['search']),
    },
    methods: {
        ...mapMutations('admin', ['SET_SEARCH','SET_ENTRIES']),
        handleSearch() {
            this.$emit('on-search',this.searchValue);
        },
        updateDates(){
            if(this.dateTill && this.dateFrom){
                this.$emit('on-change-date-from',this.dateFrom);
                this.$emit('on-change-date-to',this.dateTill);
            }
        },

        resetFilter(){
                this.dateFrom =  '';
                this.dateTill ='';
                this.searchValue ='';
                this.status ='';
                this.$emit('on-change-filter-reset' , true);
        }
        
    }

}

</script>
