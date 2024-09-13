<template>
    <div class="table-css">
        <el-table
            v-if="!['jinridaxiao', 'gunqiudaxiao'].includes(type)"
            ref="tableRef"
            :data="sliceTable"
            style="width: 100%"
            :virrual="true"
            :max-height="maxHeight"
            @select="handleSelect"
            @select-all="handleSelectAll"
        >
            <el-table-column label="排序" width="50">
                <template slot-scope="scope"> {{ (page - 1) * pageSize + (scope.$index + 1) }} </template>
            </el-table-column>
            <el-table-column width="230px" label="联赛名称">
                <template slot-scope="scope">
                    <div>
                        {{ getText(scope.row.cLEAGUE || scope.row.LEAGUE) }}
                    </div>
                    <div>
                        {{ getText(scope.row.SCORE_H) }}-
                        {{ getText(scope.row.SCORE_C) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="150px" prop="DATETIME" label="比赛时间">
                <template slot-scope="scope">
                    <div>
                        <div>{{ getText(scope.row.DATETIME) }}</div>
                        <div>
                            {{
                                scope.row.RETIMESET === "MTIME^HT"
                                    ? "中场"
                                    : getText(scope.row.RETIMESET)
                            }}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="150px" label="球队英文">
                <template slot-scope="scope">
                    <div>
                        {{ getText(scope.row.TEAM_H) }}
                    </div>
                    <div>
                        {{ getText(scope.row.TEAM_C) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="150px" label="球队">
                <template slot-scope="scope">
                    <div>
                        {{ getText(scope.row.cTEAM_H || scope.row.TEAM_H) }}
                    </div>
                    <div>
                        {{ getText(scope.row.cTEAM_C || scope.row.TEAM_C) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="80px" label="让球">
                <template slot-scope="scope">
                    <div>
                        <el-button :class="[getClass(scope.row.RATIO_RE)]">
                            {{ scope.row.STRONG === "C" ? "+" : "-" }}
                            {{ getText(scope.row.RATIO_RE) }}
                        </el-button>
                    </div>
                    <div>
                        <el-button :class="[getClass(scope.row.RATIO_RE)]">
                            {{ getText(scope.row.STRONG) === "H" ? "+" : "-" }}
                            {{ getText(scope.row.RATIO_RE) }}
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="皇冠">
                <template slot-scope="scope">
                    <div>
                        <span :class="[getClass(scope.row.IOR_REH)]">{{
                            setPanData(getText(scope.row.IOR_REH))
                        }}</span>
                    </div>
                    <div>
                        <span :class="[getClass(scope.row.IOR_REC)]">{{
                            setPanData(getText(scope.row.IOR_REC))
                        }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="智博">
                <template slot-scope="scope">
                    <div>
                        <span :class="[getClass(getZhiboRatioRe(scope.row).IOR_REH)]">{{
                            setPanData(getText(getZhiboRatioRe(scope.row).IOR_REH))
                        }}</span>
                    </div>
                    <div>
                        <span
                            :class="[getClass(getZhiboRatioRe(scope.row).IOR_REC), ,]"
                            >{{
                                setPanData(getText(getZhiboRatioRe(scope.row).IOR_REC))
                            }}</span
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="平博">
                <template slot-scope="scope">
                    <div>
                        <span
                            :class="[getClass(getPingboRatioRe(scope.row).IOR_REH)]"
                            >{{
                                setPanData(
                                    getPingboText(
                                        getText(getPingboRatioRe(scope.row).IOR_REH),
                                    ),
                                )
                            }}</span
                        >
                    </div>
                    <div>
                        <span
                            :class="[getClass(getPingboRatioRe(scope.row).IOR_REC)]"
                            >{{
                                setPanData(
                                    getPingboText(
                                        getText(getPingboRatioRe(scope.row).IOR_REC),
                                    ),
                                )
                            }}</span
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="利己">
                <template slot-scope="scope">
                    <div>
                        <span :class="[getClass(getLijiRatioRe(scope.row).IOR_REH)]">{{
                            setPanData(
                                getPingboText(
                                    getText(getLijiRatioRe(scope.row).IOR_REH),
                                ),
                            )
                        }}</span>
                    </div>
                    <div>
                        <span :class="[getClass(getLijiRatioRe(scope.row).IOR_REC)]">{{
                            setPanData(
                                getPingboText(
                                    getText(getLijiRatioRe(scope.row).IOR_REC),
                                ),
                            )
                        }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="沙巴">
                <template slot-scope="scope">
                    <div>
                        <span :class="[getClass(getShabaRatioRe(scope.row).IOR_REH)]">{{
                            setPanData(getText(getShabaRatioRe(scope.row).IOR_REH))
                        }}</span>
                    </div>
                    <div>
                        <span :class="[getClass(getShabaRatioRe(scope.row).IOR_REC)]">{{
                            setPanData(getText(getShabaRatioRe(scope.row).IOR_REC))
                        }}</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-table
            v-if="['jinridaxiao', 'gunqiudaxiao'].includes(type)"
            ref="tableRef"
            :data="sliceTable"
            style="width: 100%"
            :virrual="true"
            :max-height="maxHeight"
            @select="handleSelect"
            @select-all="handleSelectAll"
        >
            <el-table-column label="排序" width="50">
                <template slot-scope="scope"> {{ (page - 1) * pageSize + (scope.$index + 1) }} </template>
            </el-table-column>
            <el-table-column width="230px" label="联赛名称">
                <template slot-scope="scope">
                    <div>
                        {{ getText(scope.row.cLEAGUE || scope.row.LEAGUE) }}
                    </div>
                    <div>
                        {{ getText(scope.row.SCORE_H) }}-
                        {{ getText(scope.row.SCORE_C) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="150px" prop="DATETIME" label="比赛时间">
                <template slot-scope="scope">
                    <div>
                        <div>{{ getText(scope.row.DATETIME) }}</div>
                        <div>
                            {{
                                scope.row.RETIMESET === "MTIME^HT"
                                    ? "中场"
                                    : getText(scope.row.RETIMESET)
                            }}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column width="150px" label="球队英文">
                <template slot-scope="scope">
                    <div>
                        {{ getText(scope.row.TEAM_H) }}
                    </div>
                    <div>
                        {{ getText(scope.row.TEAM_C) }}
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column width="150px" label="球队">
                <template slot-scope="scope">
                    <div>
                        {{ getText(scope.row.cTEAM_H || scope.row.TEAM_H) }}
                    </div>
                    <div>
                        {{ getText(scope.row.cTEAM_C || scope.row.TEAM_C) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="80px" label="大小">
                <template slot-scope="scope">
                    <div>
                        <el-button :class="[getClass(scope.row.RATIO_ROUO)]">
                            {{ getText(scope.row.RATIO_ROUO) }}
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="皇冠">
                <template slot-scope="scope">
                    <div>
                        <span :class="[getClass(scope.row.IOR_ROUC)]">{{
                            setPanData(getText(scope.row.IOR_ROUC))
                        }}</span>
                    </div>
                    <div>
                        <span :class="[getClass(scope.row.IOR_ROUH)]">{{
                            setPanData(getText(scope.row.IOR_ROUH))
                        }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="智博">
                <template slot-scope="scope">
                    <div>
                        <span
                            :class="[getClass(getZhiboRatioRe(scope.row, 1).IOR_ROUC)]"
                            >{{
                                setPanData(
                                    getText(getZhiboRatioRe(scope.row, 1).IOR_ROUC),
                                )
                            }}</span
                        >
                    </div>
                    <div>
                        <span
                            :class="[getClass(getZhiboRatioRe(scope.row, 1).IOR_ROUH)]"
                            >{{
                                setPanData(
                                    getText(getZhiboRatioRe(scope.row, 1).IOR_ROUH),
                                )
                            }}</span
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="平博">
                <template slot-scope="scope">
                    <div>
                        <span
                            :class="[getClass(getPingboRatioRe(scope.row, 1).IOR_ROUC)]"
                            >{{
                                setPanData(
                                    getPingboText(
                                        getText(
                                            getPingboRatioRe(scope.row, 1).IOR_ROUC,
                                        ),
                                    ),
                                )
                            }}</span
                        >
                    </div>
                    <div>
                        <span
                            :class="[getClass(getPingboRatioRe(scope.row, 1).IOR_ROUH)]"
                            >{{
                                setPanData(
                                    getPingboText(
                                        getText(
                                            getPingboRatioRe(scope.row, 1).IOR_ROUH,
                                        ),
                                    ),
                                )
                            }}</span
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="利己">
                <template slot-scope="scope">
                    <div>
                        <span
                            :class="[getClass(getLijiRatioRe(scope.row, 1).IOR_ROUC)]"
                            >{{
                                setPanData(
                                    getPingboText(
                                        getText(getLijiRatioRe(scope.row, 1).IOR_ROUC),
                                    ),
                                )
                            }}</span
                        >
                    </div>
                    <div>
                        <span
                            :class="[getClass(getLijiRatioRe(scope.row, 1).IOR_ROUH)]"
                            >{{
                                setPanData(
                                    getPingboText(
                                        getText(getLijiRatioRe(scope.row, 1).IOR_ROUH),
                                    ),
                                )
                            }}</span
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="50px" label="沙巴">
                <template slot-scope="scope">
                    <div>
                        <span
                            :class="[getClass(getShabaRatioRe(scope.row, 1).IOR_ROUC)]"
                            >{{
                                setPanData(
                                    getText(getShabaRatioRe(scope.row, 1).IOR_ROUC),
                                )
                            }}</span
                        >
                    </div>
                    <div>
                        <span
                            :class="[getClass(getShabaRatioRe(scope.row, 1).IOR_ROUH)]"
                            >{{
                                setPanData(
                                    getText(getShabaRatioRe(scope.row, 1).IOR_ROUH),
                                )
                            }}</span
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page.async="page"
            :total="tableData.filter((v) => this.liansaicheckbox.includes(v.cLEAGUE)).length"
            @current-change="currentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "LandingPage",
    components: {},
    props: {
        tableData: {
            type: Array,
            default: () => [],
        },
        liansaicheckbox: {
            type: Array,
            default: () => [],
        },
        zhiboData: {
            type: Array,
            default: () => [],
        },
        pingboData: {
            type: Array,
            default: () => [],
        },
        lijiData: {
            type: Array,
            default: () => [],
        },
        shabaData: {
            type: Array,
            default: () => [],
        },
        panRadio: {
            type: String,
            default: "",
        },
        radio: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            page: 1,
            pageSize: 15,
            maxHeight: 300,
            startIndex: 0,
            // 选中的数据
            selectedRows: [],
            // 空元素，用于撑开table的高度
            vEle: undefined,
            // 是否全选
            isSelectedAll: false,
            zhibo: {},
            pingbo: {},
            liji: {},
            shaba: {},
        };
    },
    computed: {
        sliceTable() {
            // const start = this.startIndex;
            return (
                this.tableData
                    // .slice(
                    //     start,
                    //     this.tableData.length - this.startIndex > 20
                    //         ? this.startIndex + 20
                    //         : this.tableData.length
                    // )
                    .filter((v) => this.liansaicheckbox.includes(v.cLEAGUE)).slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
            );
        },
        zhiboNewData() {
            const m = {};
            this.zhiboData.forEach((v) => {
                m[v.TEAM_H + v.TEAM_C + v.RATIO_RE] = v;
            });
            return m;
        },
        pingboNewData() {
            const m = {};
            this.pingboData.forEach((v) => {
                m[v.TEAM_H + v.TEAM_C + v.RATIO_RE] = v;
            });
            return m;
        },
        lijiNewData() {
            const m = {};
            this.lijiData.forEach((v) => {
                m[v.TEAM_H + v.TEAM_C + v.RATIO_RE] = v;
            });
            return m;
        },
        shabaNewData() {
            const m = {};
            this.shabaData.forEach((v) => {
                m[v.TEAM_H + v.TEAM_C + v.RATIO_RE] = v;
            });
            return m;
        },
    },
    watch: {
        tableData() {
            // this.loadData();
        },
        radio() {
            this.reset();
            this.$nextTick(() => {
                this.$refs.tableRef && this.$refs.tableRef.doLayout();
            });
        },
        liansaicheckbox() {
            this.reset();
        }
    },
    created() {
        this.maxHeight = document.body.clientHeight - 100;
        // 创建一个空元素，这个空元素用来撑开 table 的高度，模拟所有数据的高度
        this.vEle = document.createElement("div");
        window.addEventListener("resize", () => {
            this.maxHeight = document.body.clientHeight - 100;

            this.$refs.tableRef && this.$refs.tableRef.doLayout();
        });
    },
    mounted() {
        // this.$refs.tableRef.$el
        //     .querySelector('.el-table__body-wrapper')
        //     .addEventListener('scroll', this.tableScroll, {
        //         passive: true
        //     });
    },
    methods: {
        currentChange(event) {
            this.page = event;
        },
        formatToLastTwoDigits(number) {
            return Math.floor(number * 100) / 100;
        },
        setPanData(text) {
            if (this.panRadio === "xianggang") {
                if (Number(text) < 0) {
                    return String(this.formatToLastTwoDigits(1 / text) * -1 || "");
                } else {
                    return String(this.formatToLastTwoDigits(text) || "");
                }
            } else {
                if (Number(text) > 1) {
                    return String(
                        this.formatToLastTwoDigits(100 / text / 100) * -1 || "",
                    );
                } else {
                    return String(this.formatToLastTwoDigits(text) || "");
                }
            }
        },
        // 加载数据
        loadData() {
            this.$nextTick(() => {
                if (this.isAdd && !this.tableData.length) {
                    this.vEle.style.height = this.tableData.length * 48 + "px";
                    return;
                }
                this.isAdd = true;
                // 设置成绝对定位，这个元素需要我们去控制滚动
                this.$refs.tableRef.$el.querySelector(
                    ".el-table__body",
                ).style.position = "absolute";
                // 计算表格所有数据所占内容的高度
                this.vEle.style.height = this.tableData.length * 45 + "px";
                // 把这个节点加到表格中去，用它来撑开表格的高度
                this.$refs.tableRef.$el
                    .querySelector(".el-table__body-wrapper")
                    .appendChild(this.vEle);
                // 重新设置曾经被选中的数据
                this.selectedRows.forEach((row) => {
                    this.$refs.tableRef.toggleRowSelection(row, true);
                });
            });
        },
        reset() {
            let bodyWrapperEle = this.$refs.tableRef.$el.querySelector(
                ".el-table__body-wrapper",
            );
            bodyWrapperEle.querySelector(
                ".el-table__body",
            ).style.transform = `translateY(0px)`;
        },
        tableScroll() {
            let bodyWrapperEle = this.$refs.tableRef.$el.querySelector(
                ".el-table__body-wrapper",
            );
            // 滚动的高度
            let scrollTop = bodyWrapperEle.scrollTop;
            // 下一次开始的索引
            this.startIndex = Math.floor(scrollTop / 45);
            // 滚动操作
            bodyWrapperEle.querySelector(
                ".el-table__body",
            ).style.transform = `translateY(${this.startIndex * 45}px)`;
            // 滚动操作后，上面的一些 tr 没有了，所以需要重新设置曾经被选中的数据
            this.$nextTick(() => {
                this.selectedRows.forEach((row) => {
                    this.$refs.tableRef.toggleRowSelection(row, true);
                });
            });
            // 滚动到底，加载新数据
            // if (
            //     bodyWrapperEle.scrollHeight <=
            //     scrollTop + bodyWrapperEle.clientHeight
            // ) {
            //     this.$message.warning('没有更多了');
            //     return;
            // }
        },
        handleSelect(selection) {
            this.selectedRows = selection;
        },
        /**
         * @description: 全选事件
         * @param {*} selection
         * @return {*}
         */
        handleSelectAll() {
            this.isSelectedAll = !this.isSelectedAll;
            if (this.isSelectedAll) {
                this.selectedRows = this.tableData;
            } else {
                this.selectedRows = [];
                this.$refs.tableRef.clearSelection();
            }
        },
        getZhiboRatioRe(row, type) {
            // if (this.zhibo[row.GID]) {
            //     const game = this.zhibo[row.GID];
            //     return this.zhiboNewData[
            //         game.TEAM_H + game.TEAM_C + game.RATIO_RE
            //     ];
            // }
            const game = this.getGame(this.zhiboData, row, type, "zhibo");
            // this.zhibo[row.GID] = game || '';
            return game || {};
            // return this.getGame(this.zhiboData, row, type, 'zhibo') || {};
        },
        getPingboRatioRe(row, type) {
            // if (this.pingbo[row.GID]) {
            //     const game = this.pingbo[row.GID];
            //     return this.pingboNewData[
            //         game.TEAM_H + game.TEAM_C + game.RATIO_RE
            //     ];
            // }
            const game = this.getGame(this.pingboData, row, type, "pingbo");
            // this.pingbo[row.GID] = game || '';
            return game || {};
            // return this.getGame(this.pingboData, row, type, 'pingbo') || {};
        },
        getLijiRatioRe(row, type) {
            // if (this.liji[row.GID]) {
            //     const game = this.liji[row.GID];
            //     return this.lijiNewData[
            //         game.TEAM_H + game.TEAM_C + game.RATIO_RE
            //     ];
            // }
            const game = this.getGame(this.lijiData, row, type, "liji");
            // this.liji[row.GID] = game || '';
            return game || {};
            // return this.getGame(this.lijiData, row, type, 'liji') || {};
        },
        getShabaRatioRe(row, type) {
            // if (this.shaba[row.GID]) {
            //     const game = this.shaba[row.GID];
            //     return this.shabaNewData[
            //         game.TEAM_H + game.TEAM_C + game.RATIO_RE
            //     ];
            // }
            const game = this.getGame(this.shabaData, row, type, "shaba");
            // this.shaba[row.GID] = game || '';
            return game || {};
        },
        getPingboText(num) {
            return num ? String(num - 1) : "";
        },
        splitName(name) {
            let n = name;
            if (name) {
                // (R) (R)
                name = name.indexOf('Club Social y ') === 0 ? name.split('Club Social y ')[1] : name;
                name = name.indexOf('Club ') === 0 ? name.split('Club ')[1] : name;
                name = name.split("-")[0].split(" ")[0];
            }
            return name ? name : "";
        },
        getGame(list, row, type, type2) {
            let m = null;
            let l = list;
            let self = this;
            function t(l2, row2) {
                l2.forEach((game) => {
                    if (m) return;
                    if (
                        (game.TEAM_H === row2.TEAM_H ||
                        game.TEAM_C === row2.TEAM_C ||
                        (self.splitName(game.TEAM_H) === self.splitName(row2.TEAM_H) &&
                            self.splitName(game.TEAM_C) === self.splitName(row2.TEAM_C))) && (game.STRONG === row2.STRONG || !row2.STRONG || !game.STRONG)
                    ) {
                        const t = type ? "RATIO_ROUO" : "RATIO_RE";
                        if (self.getText(game[t]) === self.getText(row2[t])) {
                            m = { ...game };
                        }
                    }
                });
            }
            t(l, row);
            // if (!m) {
            //     if (type2 === 'zhibo') {
            //         const pingboRow = this.getGame(this.pingboData, row);
            //         const lijiRow = this.getGame(this.lijiData, row);
            //         const shabaRow = this.getGame(this.shabaData, row);
            //         if (shabaRow) {
            //             t(l, shabaRow);
            //         }
            //         if (pingboRow) {
            //             t(l, pingboRow);
            //         }
            //         if (lijiRow) {
            //             t(l, lijiRow);
            //         }
            //     } else if (type2 === 'pingbo') {
            //         const zhiboRow = this.getGame(this.zhiboData, row);
            //         const lijiRow = this.getGame(this.lijiData, row);
            //         const shabaRow = this.getGame(this.shabaData, row);
            //         if (shabaRow) {
            //             t(l, shabaRow);
            //         }
            //         if (zhiboRow) {
            //             t(l, zhiboRow);
            //         }
            //         if (lijiRow) {
            //             t(l, lijiRow);
            //         }
            //     } else if (type2 === 'liji') {
            //         const zhiboRow = this.getGame(this.zhiboData, row);
            //         const pingboRow = this.getGame(this.pingboData, row);
            //         const shabaRow = this.getGame(this.shabaData, row);
            //         if (shabaRow) {
            //             t(l, shabaRow);
            //         }
            //         if (zhiboRow) {
            //             t(l, zhiboRow);
            //         }
            //         if (pingboRow) {
            //             t(l, pingboRow);
            //         }
            //     } else if (type2 === 'shaba') {
            //         const zhiboRow = this.getGame(this.zhiboData, row);
            //         const pingboRow = this.getGame(this.pingboData, row);
            //         const lijiRow = this.getGame(this.lijiData, row);
            //         if (lijiRow) {
            //             t(l, lijiRow);
            //         }
            //         if (zhiboRow) {
            //             t(l, zhiboRow);
            //         }
            //         if (pingboRow) {
            //             t(l, pingboRow);
            //         }
            //     }
            // }
            return m || null;
        },
        getClass(value) {
            if (!value || typeof value !== "string") return "";
            return value.includes("----") ? "change span" : "span";
        },
        getText(text) {
            if (!text || typeof text !== "string") return "";
            return text.split("----")[0];
        },
    },
};
</script>
<style>
span.span {
    display: block;
    /* margin: 10px 0; */
    width: max-content;
    /* padding: 10px 5px; */
}
.el-table .el-table__cell {
    padding: 0 !important;
}
div {
    /* width: max-content; */
    font-size: 10px !important;
}
span.span {
    padding: 0 5px;
}
.table-css .el-button {
    padding: 0 12px !important;
}
.table-css {
    flex: 1;
}
/* .el-table__body-wrapper {
    overflow-y: scroll;
} */
</style>
