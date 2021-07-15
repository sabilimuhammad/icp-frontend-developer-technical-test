<template>
	<div>
		<nav class="w-full fixed shadow-md px-4 h-12 top-0">
				<el-button class="absolute right-0" type="danger" @click="logout">Logout</el-button>
		</nav>
		<div class="modal-container mt-24">
			<el-table ref="singleTable" :data="books" style="width: 100%">
				<el-table-column prop="id" label="Id" width="400"></el-table-column>
				<el-table-column
					prop="name"
					label="Name"
					width="400"
				></el-table-column>
					<el-table-column
					prop="description"
					label="Description"
					width="400"
				></el-table-column>
				<el-table-column
		      fixed="right"
		      label="Operations"
		      width="120">
		      <template slot-scope="scope">
		        <el-button @click="handleClick(scope.row.id)" type="text" size="small">Detail</el-button>
		      </template>
		    </el-table-column>
			</el-table>
		</div>
		<el-dialog
		  title="Edit"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <el-form :model="editForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
				  <el-form-item label="Name" prop="pass">
				    <el-input v-model="editForm.name" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="Description" prop="checkPass">
				    <el-input v-model="editForm.description" autocomplete="off"></el-input>
				  </el-form-item>
				    <el-button type="primary" @click="editForm()">Submit</el-button>
				  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">Cancel</el-button>
		    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
  		</span>
		</el-dialog>
		<el-dialog
		  title="create"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
				  <el-form-item label="Name" prop="pass">
				    <el-input v-model="createForm.name" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="Description" prop="checkPass">
				    <el-input v-model="createForm.description" autocomplete="off"></el-input>
				  </el-form-item>
				    <el-button type="primary" @click="createForm()">Submit</el-button>
				  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">Cancel</el-button>
		    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
  		</span>
		</el-dialog>
	</div>
</template>

<script>
import localforage from 'localforage'

export default {
	data() {
		return {
			books: [],
			booksDetail: {},
			userData: {},
			dialogVisible : false,
			rules: {
				name: [
          {
            required: true,
            message: 'Please input book name',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please input book description',
            trigger: 'blur',
          },
        ],
			},
			createForm: {
				name: '',
				description: ''
			},
			editForm: {},
		};
	},
	mounted() {
		this.fetchData();
		this.fetchBookData();
	},
	methods: {
		async fetchData() {
			try {
				const token = await localforage.getItem('authToken')
				const params = { token : JSON.parse(token) }
				const res = await this.axios.get('/users/me', {
					params
				})
				this.userData = res.data.data;
			} catch (e) {
				//
			}
		},
		async fetchBookData() {
			try {
				const token = await localforage.getItem('authToken')
				const params = { token : JSON.parse(token) }
				const res = await this.axios.get('/books', {
					params
				})
				this.books = res.data.data.books;
			} catch (e) {
				//
			}
		},
		async logout() {
			try {
				await this.$auth.logout();
				await this.$router.push("/login");
			} catch (e) {
				this.$message({
					message: e.response.data.message,
					type: "error",
				});
			}
		},
		async handleClick(id) {
			try {
				const token = await localforage.getItem('authToken')
				const params = { token : JSON.parse(token), id }
				const res = await this.axios.get('/books/detail', {
					params
				})
				this.booksDetail = res.data.data;
			} catch (e) {
				//
			}
			this.dialogVisible = true;
		},
		async editForm() {
			try {
				const token = await localforage.getItem('authToken')
				const params = { token : JSON.parse(token) }
				const formData = new FormData();
				formData.append('name', this.editForm.name);
				formData.append('description', this.editForm.description);
				formData.append('id', this.booksDetail.id);
        this.axios.post('/books/edit', formData, {  params });
      } catch (e) {
        this.$message({
          message: e.response.data.message,
          type: 'error',
        })
      }
		},
		async createForm() {
			try {
				const token = await localforage.getItem('authToken')
				const params = { token : JSON.parse(token) }
				const formData = new FormData();
				formData.append('name', this.createForm.name);
				formData.append('description', this.createForm.description);
				this.axios.post('/books/insert', formData, {  params });
      } catch (e) {
        this.$message({
          message: e.response.data.message,
          type: 'error',
        })
      }
		},  
	},
};
</script>