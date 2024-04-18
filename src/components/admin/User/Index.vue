<template>
	<main id="main" class="main">

	    <div class="pagetitle">
	      <h1>General Tables</h1>
	      <nav>
	        <ol class="breadcrumb">
	          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
	          <li class="breadcrumb-item">Tables</li>
	          <li class="breadcrumb-item active">General</li>
	        </ol>
	      </nav>
	    </div>
	
	 <section class="section">
	 	<div class="row">
	 		<div class="col-lg-12">
	 			<div class="card">
		            <div class="card-body">
		              		<h5 class="card-title">Bordered Table</h5>
		              		<p>Add <code>.table-bordered</code> for borders on all sides of the table and cells.</p>
				            
				            <!-- <table class="table table-bordered">
				                <thead>
				                  <tr>
				                    <th scope="col">#</th>
				                    <th scope="col">Name</th>
				                    <th scope="col">Position</th>
				                    <th scope="col">Age</th>
				                    <th scope="col">Start Date</th>
				                  </tr>
				                </thead>
				                <tbody>
				                  <tr>
				                    <th scope="row">1</th>
				                    <td>Brandon Jacob</td>
				                    <td>Designer</td>
				                    <td>28</td>
				                    <td>2016-05-25</td>
				                  </tr>
				                  <tr>
				                    <th scope="row">2</th>
				                    <td>Bridie Kessler</td>
				                    <td>Developer</td>
				                    <td>35</td>
				                    <td>2014-12-05</td>
				                  </tr>
				                  <tr>
				                    <th scope="row">3</th>
				                    <td>Ashleigh Langosh</td>
				                    <td>Finance</td>
				                    <td>45</td>
				                    <td>2011-08-12</td>
				                  </tr>
				                  <tr>
				                    <th scope="row">4</th>
				                    <td>Angus Grady</td>
				                    <td>HR</td>
				                    <td>34</td>
				                    <td>2012-06-11</td>
				                  </tr>
				                  <tr>
				                    <th scope="row">5</th>
				                    <td>Raheem Lehner</td>
				                    <td>Dynamic Division Officer</td>
				                    <td>47</td>
				                    <td>2011-04-19</td>
				                  </tr>
				                </tbody>
				            </table>
				            <nav aria-label="Page navigation example">
				                <ul class="pagination justify-content-end">
				                  <li class="page-item disabled">
				                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
				                  </li>
				                  <li class="page-item"><a class="page-link" href="#">1</a></li>
				                  <li class="page-item"><a class="page-link" href="#">2</a></li>
				                  <li class="page-item"><a class="page-link" href="#">3</a></li>
				                  <li class="page-item">
				                    <a class="page-link" href="#">Next</a>
				                  </li>
				                </ul>
				            </nav> -->

				            <Table @page-changed="fetch" :fields="tableFields" :data="users?.data"> 
				            	<template #extra-heads>
                                    <th>Action</th>
                                </template>
                                <template #extra-cells="item">
                                    <td>
                                        <div class="btn-group">
                                          <button type="button" class="btn transparent-btn ellipsis-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> <i class="fa fa-ellipsis-v"></i></button>
                                          <div class="dropdown-menu text-left custom-dropdown" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 23px);" data-popper-placement="bottom-start">
                                               <a class="dropdown-item" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#active-modal">
                                                  <i class="fas fa-toggle-on"></i>Active</a> 
                                              </div>
                                          </div>
                                    </td>
                                </template>
				            </Table>
		            </div>
          		</div>
	 		</div>
	 	</div>
	 </section>

	</main>
</template>
<script>
import { fetchData, postData } from '@services/base.js';
export default {

    computed: {
        tableFields(){
            return [
            {
                label : 'Name',
                key : 'name',

            },
            {
                label : 'Creation Date',
                key : 'created_at',

            },
            {
                label : 'Email',
                key : 'email',

            },
            {
                label : 'Role',
                key : 'role',

            },

            ]
        },
    },
    data(){
        return {
            users : {
            	
            },
            currentStatus: '',
            dateFrom: '',
            dateTill: '',
            fromDateCheck: false,
            tillDateCheck: false,
            search : null,
            entries : null,
        }
    },
    created() {
        let { page } = this.$route.query;
        this.fetch(page);
    },
    watch: {
        search: function(val, oldVal) {
            this.fetch();
        },
        entries: function(val, oldVal) {
            this.fetch();
        },
        filterReset: function(val, oldVal) {
            this.dateFrom = this.dateTill  =this.currentStatus = this.search  = this.entries = '';
            this.fetch();
        },
        
        dateTill(val, oldVal){
            if(val.length > 0){
                this.tillDateCheck = true;
                if(this.fromDateCheck){
                    this.fetch();
                }
            }else{
                this.tillDateCheck = false;
            }
        },
        dateFrom(val, oldVal){
            if(val.length > 0){
                this.fromDateCheck = true;
                if(this.tillDateCheck){
                    this.fetch();
                }
            }else{
                this.fromDateCheck = false;
            }
        },
        
    },
    methods : {
        async fetch(page = 1){

          var result = await fetchData('get-all-users',{'page' : page});
          this.users  = result;
          // console.log(this.users);
        },
    },
}
</script>
