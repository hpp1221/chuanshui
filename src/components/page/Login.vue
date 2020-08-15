<template>
    <div class="login-wrap">
        <div class="login-container">
            <div class="ms-login">
                <div class="ms-title">川水仓库后台管理系统</div>
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <!--<el-input v-model="param.username" placeholder="username">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>-->
                        <el-input placeholder="用户名" prefix-icon="el-icon-lx-people" v-model="param.username"> </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <!--<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>-->
                        <el-input
                            placeholder="密码"
                            prefix-icon="el-icon-lx-lock"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                        >
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                    <p class="login-tips">Tips : 用户名和密码随便填。</p>
                </el-form>
            </div>
        </div>
        <div class="footer">宁波传水文化创意有限公司</div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123123'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /*background-image: url(../../assets/img/login-bg.png);*/
    /*background-size: 100%;*/
}
.login-container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(../../assets/img/login-bg.png) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
    box-sizing: border-box;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 36px;
    color: rgba(0, 0, 0, 0.85);
    /*border-bottom: 1px solid #ddd;*/
}
.ms-login {
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*width: 350px;*/
    /*margin: -190px 0 0 -175px;*/
    min-width: 260px;
    width: 368px;
    margin: 100px auto 0;
    /*border-radius: 5px;*/
    /*background: rgba(255, 255, 255, 0.3);*/
    overflow: hidden;
}
.ms-content {
    padding: 30px 0;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.footer {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 30px 0;
    text-align: center;
}
</style>
