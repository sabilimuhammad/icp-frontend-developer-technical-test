<template>
  <div class="mx-auto">
    <el-card class="modal-container w-4/12">
      <h3 class="font-semibold text-center text-2xl pb-2">Login</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        status-icon
        class="demo-ruleform font-medium"
      >
        <el-form-item label="Username" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="text-center pt-4">
          <el-button class="w-40" type="primary" @click="submit()"
            >Submit</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import localforage from 'localforage';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the password'));
      }
      if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('password');
      }
    };
    return {
      ruleForm: {
        userName: '',
        pass: '',
      },
      rules: {
        userName: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          { min: 3, trigger: 'blur' }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
      },
    };
  },
  methods: {
    async submit() {
      try {
        const formData = new FormData();
        formData.append('username', this.ruleForm.userName);
        formData.append('password', this.ruleForm.pass);

        const res = await this.axios.post('/users/login', formData)
        const token = res.data.data.token
        await localforage.setItem('authToken', token)
        await this.$router.push({ path: '/dashboard'})
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
