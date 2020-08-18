<template>
    <div class="parameter-config-container">
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>参数配置</span>
                </div>
            </div>
            <el-table v-loading="loading" :data="tableData" ref="multipleTable">
                <!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="code" label="编号" width="75" align="center"></el-table-column>
                <el-table-column prop="parameterName" label="参数名称"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <template scope="scope">
                        <el-tooltip placement="top" effect="light" popper-class="tooltip-remark">
                            <div slot="content" class="remark-box">
                                <div class="remark-title">备注</div>
                                <div class="remark-content">{{scope.row.remarks}}</div>
                            </div>
                            <i class="el-icon-warning cursor-class"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="parameterValue" label="参数值">
                    <template slot-scope="scope">
                        <el-input size="mini" placeholder="请输入" v-model="scope.row.parameterValue"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination pos-relative">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageInfo.pageIndex"
                    :page-size="pageInfo.pageSize"
                    :total="pageInfo.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import './ParameterConfiguration.less';
import { fetchData } from '../../../../api';
export default {
    name: 'ParameterConfiguration',
    data() {
        return {
            tableData: [
                {
                    code:1,
                    parameterName:'参数名称1',
                    remarks:'备注1',
                    parameterValue:'1'
                },
                  {
                    code:2,
                    parameterName:'参数名称2',
                    remarks:'备注2',
                    parameterValue:'2'
                }
            ],
            loading: false,
            pageInfo: {
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 10
            }
        };
    },
    methods: {
        //保存操作
        handleSave(index,row){
            console.log('index',index,row);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.pageInfo, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>