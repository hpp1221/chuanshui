<template>
    <div class="login-wrap">
        <div class="login-container">
            <div class="ms-login">
                <div class="ms-title">川水仓库后台管理系统</div>
                <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input placeholder="用户名" prefix-icon="el-icon-lx-people" v-model="loginForm.username"> </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                placeholder="密码"
                                prefix-icon="el-icon-lx-lock"
                                show-password="show-password"
                                v-model="loginForm.password"
                                @keyup.enter.native="submitForm()"
                        >
                        </el-input>
                    </el-form-item>
                    <div class="vCode-wrap" v-show="vCodeShow">
                        <el-form-item prop="vCode" :rules="{ required: vCodeShow, message: '请输入验证码', trigger: 'blur' }">
                            <el-input
                                    placeholder="验证码"
                                    prefix-icon="el-icon-lx-lock"
                                    v-model="loginForm.vCode"
                                    class="vCode-input-width"
                                    @keyup.enter.native="submitForm()"
                            >
                            </el-input>
                        </el-form-item>
                        <div class="vCode-box" @click="getVcode">
                            <img v-show="vCodeShow" :src="codeBase64" alt="" />
                        </div>
                    </div>
                    <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
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
                loginForm: {
                    username: '', //admin
                    password: '',
                    vCode: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 40, message: '用户名在40个字符以内', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 64, message: '请输入6-64位密码', trigger: 'blur' }
                    ]
                },
                autoLogin: false,
                loginErr: 0,
                vCodeShow: true,
                captcha_id: null,
                codeBase64:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzwAAADICAYAAAAtHeR8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGRjg0MUEyN0VGMzExRUE4NTg0RTQyNDhFQTQxRENCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGRjg0MUEzN0VGMzExRUE4NTg0RTQyNDhFQTQxRENCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkZGODQxQTA3RUYzMTFFQTg1ODRFNDI0OEVBNDFEQ0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkZGODQxQTE3RUYzMTFFQTg1ODRFNDI0OEVBNDFEQ0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7vD01OAABGwElEQVR42uyd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'
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        let request = {
                            user_name: this.loginForm.username,
                            password: this.loginForm.password
                        };
                        if (this.vCodeShow) {
                            request['captcha_id'] = this.captcha_id;
                            request['captcha_val'] = this.captcha_val;
                        }
                        // 请求登录接口
                        /*this.$ajax
                            .post('/api/base/wechat/config', request)
                            .then(res => {
                                // 登录成功 loginErr次数清零
                                if (res.error_code === this.$successCode) {
                                    this.loginErr = 0;
                                } else {
                                    // 登录失败次数+1
                                    this.loginErr = Number(this.loginErr + 1);
                                    this.$message.error('登录失败！');
                                    if (this.loginErr > 2) {
                                        // 登录失败次数超过三次 出现验证码
                                        this.$nextTick(() => {
                                            this.vCodeShow = true;
                                            // 请求 获取验证码
                                            this.getVcode();
                                        });
                                    }
                                }
                            })
                            .catch(() => {});*/

                        const self = this;
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        if (self.autoLogin == true) {
                            //传入账号名，密码，和保存天数3个参数
                            self.setCookie(self.loginForm.username, self.loginForm.password, 7);
                        } else {
                            console.log('清空Cookie');
                            //清空Cookie
                            self.clearCookie();
                        }
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.loginForm.username);
                        this.$router.push('/');
                    } else {
                        // this.$message.error('请输入账号和密码');
                        return false;
                    }
                });
            },
            // 获取验证码
            getVcode() {
                const request = {
                    width: 80,
                    height: 40
                };
                this.$ajax
                    .post('/backend/get-captcha', request)
                    .then(res => {
                        if (res.code === 200) {
                            this.codeBase64 = res.data.captcha_base64;
                            this.captcha_id = res.data.captcha_id;
                        }
                    })
                    .catch(() => {});
            },
            //设置cookie
            setCookie(_name, _pwd, _days) {
                const exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * _days); //保存的天数
                //字符串拼接cookie
                window.document.cookie = 'c_s_userName' + '=' + _name + ';path=/;expires=' + exdate.toUTCString();
                window.document.cookie = 'c_s_password' + '=' + _pwd + ';path=/;expires=' + exdate.toUTCString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    const cookie_arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    cookie_arr.forEach((ev, i) => {
                        const cookie_arr2 = ev.split('='); //再次切割
                        //判断查找相对应的值
                        if (cookie_arr2[0] === 'c_s_userName') {
                            this.autoLogin = true;
                            //  console.log(cookie_arr2[1])
                            this.loginForm.username = cookie_arr2[1]; //保存到保存数据的地方
                        } else if (cookie_arr2[0] === 'c_s_password') {
                            // console.log(cookie_arr2[1])
                            this.loginForm.password = cookie_arr2[1];
                        }
                    });
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie('', '', -1); //修改2值都为空，天数为负1天就好了
            }
        },
        mounted() {
            this.getCookie();
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
    }
    .ms-login {
        min-width: 260px;
        width: 368px;
        margin: 100px auto 0;
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
    .vCode-wrap {
        display: flex;
        justify-content: space-between;
    }
    .vCode-input-width {
        width: 276px;
    }
    .vCode-box {
        width: 80px;
        height: 40px;
        display: inline-block;
    }
    .vCode-box img {
        width: 100%;
    }
    .el-form-item,
    .el-checkbox {
        margin-bottom: 24px;
    }
    .login-btn button {
        height: 40px;
    }
    /*登录页面输入框高度*/
    >>> .el-input__inner {
        height: 40px;
        line-height: 40px;
    }
</style>
