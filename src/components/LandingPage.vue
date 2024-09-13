<template>
    <div id="wrapper">
        <el-button @click="dialogVisible = true">登录</el-button>
        <el-button @click="dialogVisible2 = true">筛选联赛</el-button>
        <el-radio-group v-model="panRadio">
            <el-radio :label="'xianggang'">香港盘</el-radio>
            <el-radio :label="'malai'">马来盘</el-radio>
        </el-radio-group>
        <el-radio-group v-model="dataRadio">
            <el-radio :label="'gunqiu'">滚球让球</el-radio>
            <el-radio :label="'gunqiudaxiao'">滚球大小</el-radio>
            <el-radio :label="'jinri'">今日让球</el-radio>
            <el-radio :label="'jinridaxiao'">今日大小</el-radio>
        </el-radio-group>
        <el-dialog title="筛选联赛" :visible.sync="dialogVisible2">
            <el-checkbox-group v-model="liansaicheckbox">
                <el-checkbox
                    :indeterminate="indeterminate1"
                    label="全选"
                    @change="handleCheckAllChange"
                ></el-checkbox>
                <el-checkbox
                    v-for="v of liansaiFilter"
                    :key="v"
                    :label="v"
                ></el-checkbox>
            </el-checkbox-group>
        </el-dialog>
        <el-dialog title="登录" :visible.sync="dialogVisible">
            <div>
                <div>
                    登录状态：
                </div>
                <div>
                    <span>皇冠：{{ huangguan.loginStatus ? '已登录' : '未登录' }} </span>
                    <span>智博：{{ zhibo.loginStatus ? '已登录' : '未登录' }} </span>
                    <span>平博：{{ pingbo.loginStatus ? '已登录' : '未登录' }} </span>
                    <span>利己：{{ liji.errorNum === 0 ? '已登录' : '未登录' }} </span>
                    <span>沙巴：{{ shaba.loginStatus ? '已登录' : '未登录' }} </span>
                </div>
            </div>
            <el-radio-group v-model="loginRadio">
                <el-radio :label="'huangguan'">皇冠</el-radio>
                <el-radio :label="'zhibo'">智博</el-radio>
                <el-radio :label="'pingbo'">平博</el-radio>
                <el-radio :label="'liji'">利己</el-radio>
                <el-radio :label="'shaba'">沙巴</el-radio>
            </el-radio-group>
            <div class="from">
                <el-form
                    v-if="loginRadio === 'huangguan'"
                    ref="ruleForm"
                    :model="huangguan"
                    style="margin-top: 20px"
                    size="small"
                    :cell-class-name="cellClassName"
                >
                    <el-form-item label="皇冠域名" prop="link">
                        <el-input
                            v-model="huangguan.link"
                            @input="input('huangguan.link')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="皇冠用户" prop="username">
                        <el-input
                            v-model="huangguan.username"
                            @input="input('huangguan.username')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="皇冠密码" prop="address">
                        <el-input
                            v-model="huangguan.password"
                            @input="input('huangguan.password')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="huangguanLogin"
                            >登录</el-button
                        >
                        <el-button @click="huangguanStart">快速监听数据</el-button>
                        <el-button @click="huangguanClose">停止</el-button>
                    </el-form-item>
                    <div>登录状态：{{ huangguan.loginStatus ? '已登录' : '未登录' }}</div>
                </el-form>
                <el-form
                    v-if="loginRadio === 'zhibo'"
                    ref="ruleForm"
                    :model="zhibo"
                    style="margin-top: 20px"
                    size="small"
                    :cell-class-name="cellClassName"
                >
                    <el-form-item label="智博域名" prop="link">
                        <el-input
                            v-model="zhibo.link"
                            @input="input('zhibo.link')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="智博用户" prop="username">
                        <el-input
                            v-model="zhibo.username"
                            @input="input('zhibo.username')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="智博密码" prop="address">
                        <el-input
                            v-model="zhibo.password"
                            @input="input('zhibo.password')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="zhiboLogin">登录</el-button>
                        <el-button @click="zhiboStart">快速监听数据</el-button>
                        <el-button @click="zhiboClose">停止</el-button>
                        <div>登录状态：{{ zhibo.loginStatus ? '已登录' : '未登录' }}</div>
                    </el-form-item>
                </el-form>
                <el-form
                    v-if="loginRadio === 'pingbo'"
                    ref="ruleForm"
                    :model="pingbo"
                    style="margin-top: 20px"
                    size="small"
                    :cell-class-name="cellClassName"
                >
                    <el-form-item label="平博域名" prop="link">
                        <el-input
                            v-model="pingbo.link"
                            @input="input('pingbo.link')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="平博用户" prop="username">
                        <el-input
                            v-model="pingbo.username"
                            @input="input('pingbo.username')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="平博密码" prop="address">
                        <el-input
                            v-model="pingbo.password"
                            @input="input('pingbo.password')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="pingboLogin">登录</el-button>
                        <el-button @click="pingboStart">快速监听数据</el-button>
                        <el-button @click="pingboClose">停止</el-button>
                        <div>登录状态：{{ pingbo.loginStatus ? '已登录' : '未登录' }}</div>
                    </el-form-item>
                </el-form>
                <el-form
                    v-if="loginRadio === 'liji'"
                    ref="ruleForm"
                    :model="liji"
                    style="margin-top: 20px"
                    size="small"
                    :cell-class-name="cellClassName"
                >
                    <el-form-item label="利己域名" prop="link">
                        <el-input
                            v-model="liji.link"
                            @input="input('liji.link')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="利己用户" prop="username">
                        <el-input
                            v-model="liji.username"
                            @input="input('liji.username')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="利己密码" prop="address">
                        <el-input
                            v-model="liji.password"
                            @input="input('liji.password')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="lijiLogin">登录</el-button>
                        <el-button @click="lijiStart">快速监听数据</el-button>
                        <el-button @click="lijiClose">停止</el-button>
                        <div>登录状态：{{ liji.errorNum === 0 ? '已登录' : '未登录' }}</div>
                    </el-form-item>
                </el-form>
                <el-form
                    v-if="loginRadio === 'shaba'"
                    ref="ruleForm"
                    :model="shaba"
                    style="margin-top: 20px"
                    size="small"
                    :cell-class-name="cellClassName"
                >
                    <el-form-item label="沙巴域名" prop="link">
                        <el-input
                            v-model="shaba.link"
                            @input="input('shaba.link')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="沙巴用户" prop="username">
                        <el-input
                            v-model="shaba.username"
                            @input="input('shaba.username')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="沙巴密码" prop="address">
                        <el-input
                            v-model="shaba.password"
                            @input="input('shaba.password')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="shabaLogin">登录</el-button>
                        <el-button @click="shabaStart">快速监听数据</el-button>
                        <el-button @click="shabaClose">停止</el-button>
                        <div>登录状态：{{ shaba.loginStatus ? '已登录' : '未登录' }}</div>
                    </el-form-item>
                </el-form>
            </div>
            <el-button @click="start">一键开启</el-button>
            <el-button @click="close">一键关闭</el-button>
        </el-dialog>
        <div v-if="dataRadio === 'gunqiu'">
            <!-- <h4>滚球</h4> -->
            <div class="table">
                <Table
                    :pan-radio="panRadio"
                    :liansaicheckbox="liansaicheckbox"
                    :radio="dataRadio"
                    :table-data="huangguanGunqiuNewData"
                    :zhibo-data="zhiboGunqiuNewData"
                    :pingbo-data="pingboGunqiuNewData"
                    :liji-data="lijiGunqiuNewData"
                    :shaba-data="shabaGunqiuNewData"
                />
            </div>
        </div>
        <div v-if="dataRadio === 'gunqiudaxiao'">
            <!-- <h4>滚球大小</h4> -->
            <div class="table">
                <Table
                    :pan-radio="panRadio"
                    :type="dataRadio"
                    :liansaicheckbox="liansaicheckbox"
                    :radio="dataRadio"
                    :table-data="huangguanGunqiuNewData"
                    :zhibo-data="zhiboGunqiuNewData"
                    :pingbo-data="pingboGunqiuNewData"
                    :liji-data="lijiGunqiuNewData"
                    :shaba-data="shabaGunqiuNewData"
                />
            </div>
        </div>
        <div v-if="dataRadio === 'jinri'">
            <!-- <h4>今日</h4> -->
            <div class="table">
                <Table
                    :pan-radio="panRadio"
                    :liansaicheckbox="liansaicheckbox"
                    :radio="dataRadio"
                    :table-data="huangguanNewData"
                    :zhibo-data="zhiboNewData"
                    :pingbo-data="pingboNewData"
                    :liji-data="lijiNewData"
                    :shaba-data="shabaNewData"
                />
            </div>
        </div>
        <div v-if="dataRadio === 'jinridaxiao'">
            <!-- <h4>今日</h4> -->
            <div class="table">
                <Table
                    :pan-radio="panRadio"
                    :type="dataRadio"
                    :liansaicheckbox="liansaicheckbox"
                    :radio="dataRadio"
                    :table-data="huangguanNewData"
                    :zhibo-data="zhiboNewData"
                    :pingbo-data="pingboNewData"
                    :liji-data="lijiNewData"
                    :shaba-data="shabaNewData"
                />
            </div>
        </div>
        <div id="liji">
            <div id="gunqiu"></div>
            <div id="jinri"></div>
        </div>
    </div>
</template>

<script>
import { parseString } from "xml2js";
const parser = parseString;
import Table from "./Table.vue";
import $ from "jquery";
// import { ipcRenderer } from 'electron';
// window.electronAPI?.ipcInvoke("minimizeWindow")
export default {
    name: "LandingPage",
    components: {
        Table,
    },
    data() {
        return {
            indeterminate1: true,
            indeterminate2: true,
            active: true,
            liansaicheckbox: [],
            dialogVisible: false,
            dialogVisible2: false,
            panRadio: "xianggang",
            dataRadio: "gunqiu",
            loginRadio: "huangguan",
            huangguanOldData: [],
            huangguanNewData: [],
            huangguanGunqiuOldData: [],
            huangguanGunqiuNewData: [],
            zhiboOldData: [],
            zhiboNewData: [],
            zhiboGunqiuOldData: [],
            zhiboGunqiuNewData: [],
            pingboOldData: [],
            pingboNewData: [],
            pingboGunqiuOldData: [],
            pingboGunqiuNewData: [],
            lijiOldData: [],
            lijiNewData: [],
            lijiGunqiuOldData: [],
            lijiGunqiuNewData: [],
            shabaOldData: [],
            shabaNewData: [],
            shabaGunqiuOldData: [],
            shabaGunqiuNewData: [],
            huangguanNewData2: [],
            huangguanGunqiuNewData2: [],
            zhiboNewData2: [],
            zhiboGunqiuNewData2: [],
            pingboNewData2: [],
            pingboGunqiuNewData2: [],
            lijiNewData2: [],
            lijiGunqiuNewData2: [],
            shabaNewData2: [],
            shabaGunqiuNewData2: [],
            huangguan: {
                link: "https://hga030.com",
                username: "Dk6389",
                password: "AAss1133",
                isHttp: false,
                loginStatus: false,
                uid: "",
            },
            liji: {
                link: "https://www.beer111.com",
                username: "",
                password: "",
                isHttp: false,
                loginStatus: false,
                uid: "",
                errorNum: ''
            },
            pingbo: {
                link: "https://www.ps898989.com",
                username: "GA18337668",
                isHttp: false,
                loginStatus: false,
                password: "aaaa6789",
            },
            zhibo: {
                link: "https://www.isn88.com",
                username: "cfc55874",
                password: "aaaa6789",
                isHttp: false,
                loginStatus: false,
                token: "",
            },
            shaba: {
                link: "https://p9e6gr.and4959.com",
                username: "",
                password: "",
                isHttp: false,
                loginStatus: false,
                token: "",
            },
            // lang1: 'zh-cn',
            // lang2: 'zh_CN',
            // lang1: 'zh-tw',
            // lang2: 'zh_TW',
            lang1: "en",
            lang2: "en",
            ruleForm: {},
        };
    },
    watch: {
    },
    computed: {
        liansaiFilter() {
            const l = [];
            this.huangguanNewData.forEach((v) => {
                if (l.includes(v.cLEAGUE)) return;
                l.push(v.cLEAGUE);
            });
            this.huangguanGunqiuNewData.forEach((v) => {
                if (l.includes(v.cLEAGUE)) return;
                l.push(v.cLEAGUE);
            });
            return l;
        },
    },
    created() {
        this.huangguan.uid = localStorage.getItem("uid");
        this.zhibo.token = localStorage.getItem("zhibo_token");
        this.getItem();
        this.checkTime = setInterval(() => {
        
            if (!this.huangguan.loginStatus) {
                this.huangguanLoginTimer = setTimeout(() => {
                    this.huangguanLogin();
                }, 6000);
            } else {
                clearTimeout(this.huangguanLoginTimer);
            }
        
            if (!this.shaba.loginStatus) {
                this.shabaLoginTimer = setTimeout(() => {
                    this.shabaLogin();
                }, 6000);
            } else {
                clearTimeout(this.shabaLoginTimer);
            }
        
            if (!this.pingbo.loginStatus) {
                this.pingboLoginTimer = setTimeout(() => {
                    this.pingboLogin();
                }, 6000);
            } else {
                clearTimeout(this.pingboLoginTimer);
            }
        
            if (!this.zhibo.loginStatus) {
                this.zhiboLoginTimer = setTimeout(() => {
                    this.zhiboLogin();
                }, 6000);
            } else {
                clearTimeout(this.zhiboLoginTimer);
            }
        }, 10 * 1000);
        // clearInterval(this.time);
        // this.time = setInterval(() => {
        //     if (!this.active) return;
        //     this.huangguanNewData2 = [...this.huangguanNewData];
        //     this.huangguanGunqiuNewData2 = [...this.huangguanGunqiuNewData];
        //     this.zhiboNewData2 = [...this.zhiboNewData];
        //     this.zhiboGunqiuNewData2 = [...this.zhiboGunqiuNewData];
        //     this.pingboNewData2 = [...this.pingboNewData];
        //     this.pingboGunqiuNewData2 = [...this.pingboGunqiuNewData];
        //     this.lijiNewData2 = [...this.lijiNewData];
        //     this.lijiGunqiuNewData2 = [...this.lijiGunqiuNewData];
        //     this.shabaNewData2 = [...this.shabaNewData];
        //     this.shabaGunqiuNewData2 = [...this.shabaGunqiuNewData];
        // }, 1000);
    },
    mounted() {
        clearInterval(this.t10);
        this.t10 = setInterval(() => {
            this.start();
        }, 1000 * 60 * 40);
        window.electronAPI?.subscribe("active", () => {
            console.log("激活");
            this.active = true;
        });
        window.electronAPI?.subscribe("unactive", () => {
            console.log("不激活");
            this.active = true;
        });
        window.electronAPI?.subscribe("liji-error", (event, message) => {
            if (message) {
                this.liji.errorNum = 0;
            } else {
                if (this.liji.errorNum === '') {
                    this.liji.errorNum = 0;
                }
                this.liji.errorNum++;
                console.log('利己刷新失败', message);
            }
        });
        window.electronAPI?.subscribe("liji", (event, message) => {
            const { gunqiuData, jinriData } = message;
            const gunqiu = document.getElementById("gunqiu");
            const jinri = document.getElementById("jinri");
            if (gunqiuData) {
                gunqiu.innerHTML = gunqiuData;
            }
            if (jinriData) {
                jinri.innerHTML = jinriData;
            }

            if (jinriData && this.dataRadio.includes('jinri')) {
                const { jinList } = this.setLijiGameList();
                const jin1 = JSON.parse(JSON.stringify(jinList));
                const jin2 = JSON.parse(JSON.stringify(jin1));
                const lijiOldData = jin1;
                if (this.lijiOldData.length) {
                    this.lijiOldData.forEach((game) => {
                        const map1 = lijiOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        const map2 = this.lijiOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        if (map1) {
                            for (let k in map1) {
                                if (!map2 || map1[k] !== map2[k]) {
                                    map1[k] = map1[k] + "----变化";
                                }
                            }
                        }
                    });
                }
                this.lijiNewData = lijiOldData;
                this.$nextTick(() => {
                    this.lijiOldData = jin2;
                });
            }
            if (gunqiuData && this.dataRadio.includes('gunqiu')) {
                const { gunList } = this.setLijiGameList();
                const gun1 = JSON.parse(JSON.stringify(gunList));
                const gun2 = JSON.parse(JSON.stringify(gun1));
                const lijiGunqiuOldData = gun1;
                if (this.lijiGunqiuOldData.length) {
                    this.lijiGunqiuOldData.forEach((game) => {
                        const map1 = lijiGunqiuOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        const map2 = this.lijiGunqiuOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        if (map1) {
                            for (let k in map1) {
                                if (!map2 || map1[k] !== map2[k]) {
                                    map1[k] = map1[k] + "----变化";
                                }
                            }
                        }
                    });
                }
                this.lijiGunqiuNewData = lijiGunqiuOldData;
                this.$nextTick(() => {
                    this.lijiGunqiuOldData = gun2;
                });
            }
        });
    },
    methods: {
        handleCheckAllChange(val) {
            this.liansaicheckbox = val ? this.liansaiFilter : [];
            this.indeterminate2 = false;
        },
        getText(text) {
            if (!text || typeof text !== "string") return "";
            return text.split("----")[0];
        },
        start() {
            this.allLogin();
            setTimeout(() => {
                this.huangguanStart();
                this.zhiboStart();
                this.pingboStart();
                this.lijiStart();
                this.shabaStart();
            }, 1000);
        },
        allLogin() {
            this.huangguanLogin();
            this.zhiboLogin();
            this.pingboLogin();
            this.lijiLogin();
            this.shabaLogin();
        },
        close() {
            this.huangguanClose();
            this.zhiboClose();
            this.pingboClose();
            this.lijiClose();
            this.shabaClose();
        },
        async shabaLogin() {
            await this.getToken();
            this.shabaList("l");
            this.shabaList("t");
        },
        shabaClose() {
            clearInterval(this.timer8);
        },
        shabaStart() {
            this.shabaClose();
            this.timer8 = setInterval(() => {
                if (!this.active) return;
                if (this.dataRadio.includes('gunqiu')) {
                    this.shabaList("l");
                }
                if (this.dataRadio.includes('jinri')) {
                    this.shabaList("t");
                }
            }, 1000);
        },
        async getToken() {
            const res = await this.$axios({
                url: `https://p9e6mi.and4959.com/api/ApiSiteLogin/ReGenerateToken`,
                method: "post",
                data: {
                    GalaxyUserServerGroup: "twt1p.gbf",
                    Lang: "en-US",
                    isBefore: true,
                    isExtend: true,
                },
            });
            if (res.data.Code === "WAE-1002") {
                this.$message.warning("沙巴ip被限制");
                this.shaba.token = "";
                return;
            }
            const res2 = await this.$axios({
                url: `https://p9e6mi.and4959.com/api/Config/GetBeforeOddsServerConfig`,
                method: "get",
                headers: {
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    Authorization: `Bearer ${res.data.Data.Token}`,
                },
            });

            this.shaba.token = res2.data.Data.OneAuthenticationInfo.AccessToken;
        },
        async shabaList(DateType) {
            if (!this.shaba.token) return;
            this.shaba.isHttp = true;
            try {
                const res = await this.$axios({
                    url: `https://sddolo.t1111.net/BFOdds/ShowAllOdds`,
                    method: "post",
                    data: {
                        GameId: 1,
                        DateType, // l u t
                        BetTypeClass: "OU",
                        GameType: 0,
                    },
                    headers: {
                        _mculture: "en-US",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept-Language": "zh-CN,zh;q=0.9",
                        Authorization: `Bearer ${this.shaba.token}`,
                    },
                });
                // console.log('TeamN---TeamN', res.data.Data.TeamN);
                // 数据➖3
                const bisaiList = res.data.Data.NewMatch.map((v) => {
                    return {
                        BetTypeClass: "OU",
                        DateType,
                        GameId: v.GameID,
                        GameType: 0,
                        Matchid: v.MatchId,
                        LeagueId: v.LeagueId,
                    };
                }).filter(
                    (v) =>
                        res.data.Data.LeagueN[v.LeagueId]
                            .split(" ")[0]
                            .toLocaleLowerCase() !== "saba",
                );
                if (!bisaiList.length) return;
                const res2 = await this.$axios({
                    url: `https://sddolo.t1111.net/BFOdds/GetMarkets`,
                    method: "post",
                    data: bisaiList,
                    headers: {
                        "Accept-Language": "zh-CN,zh;q=0.9",
                        Authorization: `Bearer ${this.shaba.token}`,
                    },
                });
                for (let k in res2.data.Data) {
                    const item = res.data.Data.NewMatch.find(
                        (v1) => String(v1.MatchId) === k,
                    );
                    if (item) {
                        res2.data.Data[k].details = item;
                    }
                }
                const list = this.setShabaGameList(res.data.Data, res2.data.Data);
                const oldData = list;
                const oldListStr =
                    DateType !== "l" ? "shabaOldData" : "shabaGunqiuOldData";
                const newListStr =
                    DateType !== "l" ? "shabaNewData" : "shabaGunqiuNewData";
                const oldData2 = this[oldListStr];
                if (oldData2.length) {
                    oldData2.forEach((game) => {
                        const map1 = oldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        const map2 = oldData2.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        for (let k in map1) {
                            if (map1[k] !== map2[k]) {
                                map1[k] = map1[k] + "----变化";
                            }
                        }
                    });
                }
                this[newListStr] = oldData;
                this.shaba.loginStatus = true;
                this.$nextTick(() => {
                    this[oldListStr] = this.setShabaGameList(
                        res.data.Data,
                        res2.data.Data,
                    );
                });
            } catch (err) {
                this.shaba.loginStatus = false;
                console.log(err);
            }
            this.shaba.isHttp = false;
        },
        setShabaGameList(data, m) {
            const { LeagueN, TeamN } = data;
            const list = [];
            for (let k in m) {
                const v = m[k];
                const GID = v.details.MatchId;
                const LEAGUE = LeagueN[v.details.LeagueId].split("|")[0];
                const DATETIME = new Date(
                    +new Date(v.details.GameTime) + 1000 * 60 * 60 * 12,
                ).Format("yyyy-MM-dd hh:mm:ss");
                const TEAM_H = TeamN[v.details.TeamId1].split("|")[0];
                const TEAM_C = TeamN[v.details.TeamId2].split("|")[0];
                v.NewOdds.forEach((item) => {
                    let RATIO_RE = "";
                    let IOR_REH = "";
                    let IOR_REC = "";
                    let RATIO_ROUO = "";
                    let IOR_ROUC = "";
                    let IOR_ROUH = "";
                    if (item.BetTypeId === 1) {
                        // 让球盘
                        RATIO_RE = String(item.Line);
                        IOR_REH = String(item.Selections.h.Price);
                        IOR_REC = String(item.Selections.a.Price);
                    }
                    if (item.BetTypeId === 3) {
                        // 大小盘
                        RATIO_ROUO = String(item.Line);
                        IOR_ROUC = String(item.Selections.h.Price);
                        IOR_ROUH = String(item.Selections.a.Price);
                        RATIO_RE = "";
                    }
                    if (item.BetTypeId !== 1 && item.BetTypeId !== 3) return;
                    list.push({
                        GID, // id
                        LEAGUE, // 联赛名称
                        DATETIME, // 比赛时间 （有p结尾是下午 要加12 a是早上）
                        TEAM_H, // 主队名称
                        TEAM_C, // 客队名称

                        RATIO_RE: RATIO_RE === "" ? "" : String(Math.abs(RATIO_RE)), // 让球

                        STRONG: Number(RATIO_RE) < 0 ? "C" : "H", // C 是客队让球 H是主队让球

                        IOR_REH: String(IOR_REH), // 主队让球水位
                        IOR_REC: String(IOR_REC), // 客队被让水位

                        IOR_ROUC, // 大球水位
                        IOR_ROUH, // 小球水位

                        RATIO_ROUO, // 大小
                        RATIO_ROUU: RATIO_ROUO, // 大小
                    });
                });
            }
            return list;
        },
        setLijiGameList() {
            const jinList = [];
            $("#jinri")
                .find("tr")
                .each(function (i, v) {
                    const TEAM_H = $(this).find("td").eq(2).find(".OddsL").text();
                    const TEAM_C = $(this).find("td").eq(3).find(".OddsL").text();
                    const RATIO_RE = $(this).find("td").eq(2).find(".OddsM").text();
                    const IOR_REH = $(this).find("td").eq(2).find(".OddsR").text();
                    const IOR_REC = $(this).find("td").eq(3).find(".OddsR").text();
                    jinList.push({
                        GID: "", // id
                        LEAGUE: "", // 联赛名称
                        DATETIME: "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                        TEAM_H, // 主队名称
                        TEAM_C, // 客队名称

                        RATIO_RE: String(Math.abs(RATIO_RE)), // 让球

                        STRONG: Number(RATIO_RE) > 0 ? "C" : "H", // C 是客队让球 H是主队让球

                        IOR_REH: String(IOR_REH), // 主队让球水位
                        IOR_REC: String(IOR_REC), // 客队被让水位

                        IOR_ROUC: "", // 大球水位
                        IOR_ROUH: "", // 小球水位

                        RATIO_ROUO: "", // 大小
                        RATIO_ROUU: "", // 大小
                    });
                });
            const gunList = [];
            $("#gunqiu")
                .find("tr")
                .each(function (i, v) {
                    const TEAM_H = $(this).find("td").eq(2).find(".OddsL").text();
                    const TEAM_C = $(this).find("td").eq(3).find(".OddsL").text();
                    const RATIO_RE = $(this).find("td").eq(2).find(".OddsM").text();
                    const IOR_REH = $(this).find("td").eq(2).find(".OddsR ").text();
                    const IOR_REC = $(this).find("td").eq(3).find(".OddsR ").text();
                    if (TEAM_H === 'Odra Opole') {
                        console.log('33', Number(RATIO_RE) < 0 ? "C" : "H", Number(RATIO_RE));
                    }
                    gunList.push({
                        GID: "", // id
                        LEAGUE: "", // 联赛名称
                        DATETIME: "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                        TEAM_H, // 主队名称
                        TEAM_C, // 客队名称

                        RATIO_RE: String(Math.abs(RATIO_RE)), // 让球

                        STRONG: Number(RATIO_RE) > 0 ? "C" : "H", // C 是客队让球 H是主队让球

                        IOR_REH: String(IOR_REH), // 主队让球水位
                        IOR_REC: String(IOR_REC), // 客队被让水位

                        IOR_ROUC: "", // 大球水位
                        IOR_ROUH: "", // 小球水位

                        RATIO_ROUO: "", // 大小
                        RATIO_ROUU: "", // 大小
                    });
                });
            return {
                jinList,
                gunList,
            };
        },
        getItem() {
            ["huangguan", "zhibo", "pingbo", "liji", "shaba"].forEach((v) => {
                ["link", "username", "password"].forEach((key) => {
                    this[v][key] = localStorage.getItem(`${v}.${key}`) || this[v][key];
                });
            });
        },
        input(key) {
            const k = key.split(".");
            localStorage.setItem(key, this[k[0]][k[1]]);
        },
        cellClassName({ row, column }) {
            if (this.hasDataChanged(row, column)) {
                return "data-changed-cell";
            }
            return "";
        },
        compare(key) {
            return (obj1, obj2) => {
                return +new Date(obj1[key]) - +new Date(obj2[key]);
            };
        },
        hasDataChanged(row, column) {
            // 假设row是当前行数据，column是当前列数据，
            // 这里需要根据实际情况进行判断逻辑
            // 返回true或false表示数据是否变化
            return this.oldData[row.id][column.property] !== row[column.property];
        },
        parser(response) {
            return new Promise((res, rej) => {
                if (!response || !response.data) {
                    rej("error");
                    return;
                }
                parser(response.data, (err, result) => {
                    if (err) {
                        console.error("解析 XML 出错:", err);
                        rej(result);
                    } else {
                        // 这里 result 就是解析后的 JavaScript 对象
                        // console.log(result);
                        res(result);
                    }
                });
            });
        },
        async lijiLogin() {
            window.electronAPI?.ipcInvoke("liji-open", this.liji.link);
            // const res = await this.$axios({
            //     url: `${this.liji.link}/zh-CN/euro/%e8%b6%b3%e7%90%83`,
            //     method: 'get'
            // });
            // const iframe = document.getElementById('liji');
            // // console.log('res---res', res.data);
            // if (iframe.contentDocument) {
            //     // 如果支持，直接写入HTML
            //     iframe.contentDocument.write(res.data);
            // } else {
            //     // 如果不支持，使用contentWindow的document写入HTML
            //     iframe.contentWindow.write(res.data);
            // }
            // iframe.contentWindow.domain = 'www.u16888.com';
            // this.lijihttp();
        },
        async lijihttp() {
            const res1 = await this.$axios({
                url: `${this.liji.link}web/public/SendLogToServer.aspx`,
                method: "get",
            });
            const res2 = await this.$axios({
                url: `${this.liji.link}/web/public/authorize-domain.aspx?domain=www.u16888.com`,
                method: "get",
            });
            const res3 = await this.$axios({
                url: `${this.liji.link}/js/clientlog.js`,
                method: "get",
            });
            setTimeout(() => {
                const iframe = document.getElementById("liji");
                const iFrameDoc =
                    iframe.contentDocument || iframe.contentWindow.document;
                const script1 = iFrameDoc.createElement("script");
                const script2 = iFrameDoc.createElement("script");
                const script3 = iFrameDoc.createElement("script");
                script1.type = "text/javascript";
                script1.text = res1.data;
                iFrameDoc.body.appendChild(script1);
                script2.type = "text/javascript";
                script2.text = res2.data;
                iFrameDoc.body.appendChild(script2);
                script3.type = "text/javascript";
                script3.text = res3.data;
                iFrameDoc.body.appendChild(script3);
            }, 2000);
        },
        async lijiList() {
            // const t = +new Date().Format('yyyyMMdd');
            // const res = await this.$axios({
            //     url: `${this.liji.link}/zh-cn/data/event?ts=c65a1ce6&tk=286,286,11,1,0,0,0,20240722,1,0,0,4`,
            //     method: 'get'
            // });
            // console.log('res---res', res);
        },
        lijiStart() {
            window.electronAPI?.ipcInvoke("liji-start");
        },
        lijiClose() {
            window.electronAPI?.ipcInvoke("liji-close");
        },
        async get_game_list2(lid) {
            // 根据id 获取比赛
            const res = await this.$axios({
                url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                    p: "get_game_list",
                    uid: this.huangguan.uid,
                    ver: "2024-07-15-removeCupBanner_22",
                    langx: this.lang1,
                    p3type: "",
                    date: 0,
                    gtype: "ft",
                    showtype: "today",
                    rtype: "rnou",
                    ltype: 3,
                    cupFantasy: "N",
                    lid: lid,
                    action: "choice_league",
                    sorttype: "L",
                    specialClick: "",
                    isFantasy: "N",
                    ts: +new Date(),
                },
            });
            const result = await this.parser(res);
            if (result.serverresponse.code && result.serverresponse.code[0] === 'error' && result.serverresponse.msg[0] === 'doubleLogin') {
                console.log('result---result', result);
                this.huangguan.loginStatus = false;
                return;
            }
            // 根据id 获取比赛
            const res2 = await this.$axios({
                url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                    p: "get_game_list",
                    uid: this.huangguan.uid,
                    ver: "2024-07-15-removeCupBanner_22",
                    langx: "zh-cn",
                    p3type: "",
                    date: 0,
                    gtype: "ft",
                    showtype: "today",
                    rtype: "rnou",
                    ltype: 3,
                    cupFantasy: "N",
                    lid: lid,
                    action: "choice_league",
                    sorttype: "L",
                    specialClick: "",
                    isFantasy: "N",
                    ts: +new Date(),
                },
            });
            const result2 = await this.parser(res2);

            if (result2.serverresponse.code && result2.serverresponse.code[0] === 'error' && result2.serverresponse.msg[0] === 'doubleLogin') {
                console.log('result2---result2', result2);
                this.huangguan.loginStatus = false;
                return;
            }
            this.huangguan.loginStatus = true;
            const ec1 = result.serverresponse.ec;
            const ec2 = result2.serverresponse.ec;
            if (ec1 && ec2) {
                ec1.forEach((v1) => {
                    const game1 = v1.game[0];
                    ec2.forEach((v2) => {
                        const game2 = v2.game[0];
                        if (game1.GID[0] === game2.GID[0]) {
                            game1.cTEAM_H = game2.TEAM_H;
                            game1.cTEAM_C = game2.TEAM_C;
                            game1.cLEAGUE = game2.LEAGUE;
                        }
                    });
                });
            }
            return result;
        },
        async get_league_list_All() {
            // 获取全部比赛的id
            const res = await this.$axios({
                url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                    p: "get_league_list_All",
                    uid: this.huangguan.uid,
                    ver: "2024-07-15-removeCupBanner_22",
                    langx: this.lang1,
                    gtype: "FT",
                    FS: "N",
                    showtype: "ft",
                    date: 0,
                    ts: 0,
                    nocp: "N",
                },
            });
            const result = await this.parser(res);
            if (result.serverresponse.code && result.serverresponse.code[0] === 'error' && result.serverresponse.msg[0] === 'doubleLogin') {
                console.log('result---result', result);
                this.huangguan.loginStatus = false;
                return;
            }
            const idList = this.getAllId(result);
            const n = Math.ceil(idList.length / 8);
            const list = await Promise.all(
                [...Array(n)].map((item, i) =>
                    this.get_game_list2(idList.slice(i * 8, (i + 1) * 8).join(",")),
                ),
            );
            let newList = [];
            list.map((v) => {
                const l = this.setHuangguanGameList(v, 1);
                newList = newList.concat([...l]);
            });
            if (!newList.length) return;

            if (this.huangguanOldData.length) {
                this.huangguanOldData.forEach((game) => {
                    const map1 = newList.find(
                        (item) =>
                            game.GID === item.GID &&
                            this.getText(game.RATIO_RE) === this.getText(item.RATIO_RE),
                    );
                    const map2 = this.huangguanOldData.find(
                        (item) =>
                            game.GID === item.GID &&
                            this.getText(game.RATIO_RE) === this.getText(item.RATIO_RE),
                    );
                    for (let k in map1) {
                        if (map1[k] !== map2[k]) {
                            map1[k] = map1[k] + "----变化";
                        }
                    }
                });
            }
            this.huangguanNewData = newList;
            this.$nextTick(() => {
                let huangguanOldData = [];
                list.map((v) => {
                    const l = this.setHuangguanGameList(v, 1);
                    huangguanOldData = huangguanOldData.concat([...l]);
                });
                this.huangguanOldData = huangguanOldData;
            });
        },
        async get_game_list() {
            // 滚球
            const res = await this.$axios({
                url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                    p: "get_game_list",
                    uid: this.huangguan.uid,
                    ver: "2024-07-15-removeCupBanner_22",
                    langx: this.lang1,
                    gtype: "ft",
                    showtype: "live",
                    ltype: 3,
                    specialClick: "",
                    p3type: "",
                    date: "",
                    rtype: "rrnou",
                    cupFantasy: "N",
                    sorttype: "L",
                    isFantasy: "N",
                    ts: +new Date(),
                },
            });
            const result = await this.parser(res);
            if (result.serverresponse.code && result.serverresponse.code[0] === 'error' && result.serverresponse.msg[0] === 'doubleLogin') {
                console.log('result---result', result);
                this.huangguan.loginStatus = false;
                return;
            }

            const res2 = await this.$axios({
                url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                    p: "get_game_list",
                    uid: this.huangguan.uid,
                    ver: "2024-07-15-removeCupBanner_22",
                    langx: "zh-cn",
                    gtype: "ft",
                    showtype: "live",
                    ltype: 3,
                    specialClick: "",
                    p3type: "",
                    date: "",
                    rtype: "rrnou",
                    cupFantasy: "N",
                    sorttype: "L",
                    isFantasy: "N",
                    ts: +new Date(),
                },
            });
            const result2 = await this.parser(res2);
            if (result2.serverresponse.code && result2.serverresponse.code[0] === 'error' && result2.serverresponse.msg[0] === 'doubleLogin') {
                console.log('result2---result2', result2);
                return;
            }

            const ec1 = result.serverresponse.ec;
            const ec2 = result2.serverresponse.ec;
            if (ec1 && ec2) {
                ec1.forEach((v1) => {
                    const game1 = v1.game[0];
                    ec2.forEach((v2) => {
                        const game2 = v2.game[0];
                        if (game1.GID[0] === game2.GID[0]) {
                            game1.cTEAM_H = game2.TEAM_H;
                            game1.cTEAM_C = game2.TEAM_C;
                            game1.cLEAGUE = game2.LEAGUE;
                        }
                    });
                });
            }

            const huangguanGunqiuOldData = this.setHuangguanGameList(result);
            if (this.huangguanGunqiuOldData.length) {
                this.huangguanGunqiuOldData.forEach((game) => {
                    const map1 = huangguanGunqiuOldData.find(
                        (item) =>
                            game.GID === item.GID &&
                            this.getText(game.RATIO_RE) === this.getText(item.RATIO_RE),
                    );
                    const map2 = this.huangguanGunqiuOldData.find(
                        (item) =>
                            game.GID === item.GID &&
                            this.getText(game.RATIO_RE) === this.getText(item.RATIO_RE),
                    );
                    for (let k in map1) {
                        if (map1[k] !== map2[k]) {
                            map1[k] = map1[k] + "----变化";
                        }
                    }
                });
            }
            this.huangguanGunqiuNewData = huangguanGunqiuOldData;
            this.$nextTick(() => {
                this.huangguanGunqiuOldData = this.setHuangguanGameList(result);
            });
        },
        async huangguanLogin() {
            try {
                const res = await this.$axios({
                    url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        username: this.huangguan.username,
                        password: this.huangguan.password,
                        p: "chk_login",
                        langx: this.lang1,
                        ver: "2024-07-15-removeCupBanner_22",
                        app: "N",
                        auto: "HZEGIC",
                    },
                });
                const result = await this.parser(res);

                if (result.serverresponse.msg && result.serverresponse.msg[0] == '108') {
                    console.log('result---result', result);
                    this.huangguan.loginStatus = false;
                    this.huangguan.link = this.huangguan.link === 'https://hga030.com' ? 'https://hga038.com' : 'https://hga030.com';
                    return;
                }
                this.huangguan.uid = result.serverresponse.uid[0];
                localStorage.setItem("uid", this.huangguan.uid);
                await this.$axios({
                    url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        p: "memSet",
                        ver: "2024-07-15-removeCupBanner_22",
                        uid: this.huangguan.uid,
                        langx: this.lang1,
                        action: "check",
                    },
                });
                await this.$axios({
                    url: `${this.huangguan.link}/transform.php?ver=2024-07-15-removeCupBanner_22`,
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        p: "service_mainget",
                        ver: "2024-07-15-removeCupBanner_22",
                        langx: this.lang1,
                        login: "N",
                    },
                });
                this.get_game_list();
                this.get_league_list_All();
            } catch (err) {
                this.$message.warning("皇冠登录失败");
            }
            // console.log('data---data', result);
        },
        huangguanStart() {
            this.huangguanClose();
            this.timer = setInterval(() => {
                if (!this.huangguan.loginStatus) return;
                if (!this.active) return;
                if (!this.dataRadio.includes('gunqiu')) return;
                this.get_game_list();
            }, 1000);
            this.timer2 = setInterval(() => {
                if (!this.active) return;
                if (!this.huangguan.loginStatus) return;
                if (!this.dataRadio.includes('jinri')) return;
                this.get_league_list_All();
            }, 1000);
        },
        huangguanClose() {
            clearInterval(this.timer);
            clearInterval(this.timer2);
        },
        getAllId(result) {
            if (!result.serverresponse.classifier) return [];
            const classifier = result.serverresponse.classifier[0];
            const { region } = classifier;
            const idList = [];
            region.forEach((item) => {
                item.league.forEach((v) => {
                    idList.push(v["$"].id);
                });
            });
            return idList;
        },
        formatToLastTwoDigits(number) {
            return Math.floor(number * 100) / 100;
        },
        getHuangguanShui(t) {
            if (!t) return t;
            const num = Number(t);
            if (num > 1) {
                return String(1 / (2 - num));
            }
            return String(num);
        },
        setHuangguanGameList(result, type) {
            // type 为1 为今日或早盘 不然为滚球
            const ec = result.serverresponse.ec;
            const list = [];
            if (!ec) return [];
            ec.forEach((v) => {
                const game = v.game[0];
                if (game.DATETIME) {
                    const d = game.DATETIME[0].includes("a")
                        ? 1000 * 60 * 60 * 12
                        : 1000 * 60 * 60 * 24;
                    const t =
                        (new Date().Format("yyyy") + " " + game.DATETIME[0]).slice(
                            0,
                            -1,
                        ) + ":00";
                    const time = +new Date(t) + d;
                    game.DATETIME[0] = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                }
                if (game.LEAGUE && game.LEAGUE[0].includes("EFootball")) return;
                // A_sub_STRONG
                // console.log('game---', game);
                if (type === 1) {
                    let RATIO_R = "";
                    if (game.RATIO_R) {
                        const l = game.RATIO_R[0].split("/");
                        if (l[1]) {
                            RATIO_R = (Number(l[0]) + Number(l[1])) / 2;
                        } else {
                            RATIO_R = game.RATIO_R[0];
                        }
                    }
                    let RATIO_OUO = "";
                    if (game.RATIO_OUO) {
                        const l = game.RATIO_OUO[0].split("/");
                        if (l[1]) {
                            RATIO_OUO = (Number(l[0]) + Number(l[1])) / 2;
                        } else {
                            RATIO_OUO = game.RATIO_OUO[0];
                        }
                    }
                    list.push({
                        RETIMESET: game.RETIMESET ? game.RETIMESET[0] : "",
                        SCORE_H: game.SCORE_H ? game.SCORE_H[0] : "",
                        SCORE_C: game.SCORE_C ? game.SCORE_C[0] : "",

                        cTEAM_H: game.cTEAM_H ? game.cTEAM_H[0] : "", // 主队中文名称
                        cTEAM_C: game.cTEAM_C ? game.cTEAM_C[0] : "", // 客队中文名称
                        cLEAGUE: game.cLEAGUE ? game.cLEAGUE[0] : "", // 联赛中文名称

                        GID: game.GID ? game.GID[0] : "", // id
                        LEAGUE: game.LEAGUE ? game.LEAGUE[0] : "", // 联赛名称
                        DATETIME: game.DATETIME ? game.DATETIME[0] : "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                        TEAM_H: game.TEAM_H ? game.TEAM_H[0] : "", // 主队名称
                        TEAM_C: game.TEAM_C ? game.TEAM_C[0] : "", // 客队名称

                        RATIO_RE: game.RATIO_R ? String(RATIO_R) : "", // 让球

                        STRONG: game.STRONG ? game.STRONG[0] : "", // C 是客队让球 H是主队让球

                        IOR_REH: this.getHuangguanShui(
                            game.IOR_RH ? game.IOR_RH[0] : "",
                        ), // 主队让球水位
                        IOR_REC: this.getHuangguanShui(
                            game.IOR_RC ? game.IOR_RC[0] : "",
                        ), // 客队被让水位

                        IOR_ROUC: this.getHuangguanShui(
                            game.IOR_OUC ? game.IOR_OUC[0] : "",
                        ), // 大球水位
                        IOR_ROUH: this.getHuangguanShui(
                            game.IOR_OUH ? game.IOR_OUH[0] : "",
                        ), // 小球水位

                        RATIO_ROUO: String(RATIO_OUO), // 大小
                        RATIO_ROUU: RATIO_OUO, // 大小
                    });
                    if (game.A_sub_RATIO_R) {
                        let A_sub_RATIO_R = "";
                        if (game.A_sub_RATIO_R) {
                            const l = game.A_sub_RATIO_R[0].split("/");
                            if (l[1]) {
                                A_sub_RATIO_R = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                A_sub_RATIO_R = game.A_sub_RATIO_R[0];
                            }
                        }
                        let A_sub_RATIO_OUO = "";
                        if (game.A_sub_RATIO_OUO) {
                            const l = game.A_sub_RATIO_OUO[0].split("/");
                            if (l[1]) {
                                A_sub_RATIO_OUO = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                A_sub_RATIO_OUO = game.A_sub_RATIO_OUO[0];
                            }
                        }
                        list.push({
                            RETIMESET: game.RETIMESET ? game.RETIMESET[0] : "",
                            SCORE_H: game.SCORE_H ? game.SCORE_H[0] : "",
                            SCORE_C: game.SCORE_C ? game.SCORE_C[0] : "",

                            cTEAM_H: game.cTEAM_H ? game.cTEAM_H[0] : "", // 主队中文名称
                            cTEAM_C: game.cTEAM_C ? game.cTEAM_C[0] : "", // 客队中文名称
                            cLEAGUE: game.cLEAGUE ? game.cLEAGUE[0] : "", // 联赛中文名称

                            GID: game.A_sub_GID ? game.A_sub_GID[0] : "", // id
                            LEAGUE: game.LEAGUE ? game.LEAGUE[0] : "", // 联赛名称
                            DATETIME: game.DATETIME ? game.DATETIME[0] : "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                            TEAM_H: game.TEAM_H ? game.TEAM_H[0] : "", // 主队名称
                            TEAM_C: game.TEAM_C ? game.TEAM_C[0] : "", // 客队名称

                            RATIO_RE: game.A_sub_RATIO_R ? String(A_sub_RATIO_R) : "", // 让球

                            STRONG: game.A_sub_STRONG ? game.A_sub_STRONG[0] : "", // C 是客队让球 H是主队让球

                            IOR_REH: this.getHuangguanShui(
                                game.A_sub_IOR_RH ? game.A_sub_IOR_RH[0] : "",
                            ), // 主队让球水位
                            IOR_REC: this.getHuangguanShui(
                                game.A_sub_IOR_RC ? game.A_sub_IOR_RC[0] : "",
                            ), // 客队被让水位

                            IOR_ROUC: this.getHuangguanShui(
                                game.A_sub_IOR_OUC ? game.A_sub_IOR_OUC[0] : "",
                            ), // 大球水位
                            IOR_ROUH: this.getHuangguanShui(
                                game.A_sub_IOR_OUH ? game.A_sub_IOR_OUH[0] : "",
                            ), // 小球水位

                            RATIO_ROUO: String(A_sub_RATIO_OUO), // 大小
                            RATIO_ROUU: A_sub_RATIO_OUO, // 大小
                        });
                    }
                    if (game.B_sub_RATIO_R) {
                        let B_sub_RATIO_R = "";
                        if (game.B_sub_RATIO_R) {
                            const l = game.B_sub_RATIO_R[0].split("/");
                            if (l[1]) {
                                B_sub_RATIO_R = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                B_sub_RATIO_R = game.B_sub_RATIO_R[0];
                            }
                        }
                        let B_sub_RATIO_OUO = "";
                        if (game.B_sub_RATIO_OUO) {
                            const l = game.B_sub_RATIO_OUO[0].split("/");
                            if (l[1]) {
                                B_sub_RATIO_OUO = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                B_sub_RATIO_OUO = game.B_sub_RATIO_OUO[0];
                            }
                        }
                        list.push({
                            RETIMESET: game.RETIMESET ? game.RETIMESET[0] : "",
                            SCORE_H: game.SCORE_H ? game.SCORE_H[0] : "",
                            SCORE_C: game.SCORE_C ? game.SCORE_C[0] : "",

                            cTEAM_H: game.cTEAM_H ? game.cTEAM_H[0] : "", // 主队中文名称
                            cTEAM_C: game.cTEAM_C ? game.cTEAM_C[0] : "", // 客队中文名称
                            cLEAGUE: game.cLEAGUE ? game.cLEAGUE[0] : "", // 联赛中文名称

                            GID: game.B_sub_GID ? game.B_sub_GID[0] : "", // id
                            LEAGUE: game.LEAGUE ? game.LEAGUE[0] : "", // 联赛名称
                            DATETIME: game.DATETIME ? game.DATETIME[0] : "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                            TEAM_H: game.TEAM_H ? game.TEAM_H[0] : "", // 主队名称
                            TEAM_C: game.TEAM_C ? game.TEAM_C[0] : "", // 客队名称

                            RATIO_RE: game.B_sub_RATIO_R ? String(B_sub_RATIO_R) : "", // 让球

                            STRONG: game.B_sub_STRONG ? game.B_sub_STRONG[0] : "", // C 是客队让球 H是主队让球

                            IOR_REH: this.getHuangguanShui(
                                game.B_sub_IOR_RH ? game.B_sub_IOR_RH[0] : "",
                            ), // 主队让球水位
                            IOR_REC: this.getHuangguanShui(
                                game.B_sub_IOR_RC ? game.B_sub_IOR_RC[0] : "",
                            ), // 客队被让水位

                            IOR_ROUC: this.getHuangguanShui(
                                game.B_sub_IOR_OUC ? game.B_sub_IOR_OUC[0] : "",
                            ), // 大球水位
                            IOR_ROUH: this.getHuangguanShui(
                                game.B_sub_IOR_OUH ? game.B_sub_IOR_OUH[0] : "",
                            ), // 小球水位

                            RATIO_ROUO: String(B_sub_RATIO_OUO), // 大小
                            RATIO_ROUU: B_sub_RATIO_OUO, // 大小
                        });
                    }
                } else {
                    let RATIO_RE = "";
                    if (game.RATIO_RE) {
                        const l = game.RATIO_RE[0].split("/");
                        if (l[1]) {
                            RATIO_RE = (Number(l[0]) + Number(l[1])) / 2;
                        } else {
                            RATIO_RE = game.RATIO_RE[0];
                        }
                    }
                    let RATIO_ROUO = "";
                    if (game.RATIO_ROUO) {
                        const l = game.RATIO_ROUO[0].split("/");
                        if (l[1]) {
                            RATIO_ROUO = (Number(l[0]) + Number(l[1])) / 2;
                        } else {
                            RATIO_ROUO = game.RATIO_ROUO[0];
                        }
                    }
                    list.push({
                        RETIMESET: game.RETIMESET ? game.RETIMESET[0] : "",
                        SCORE_H: game.SCORE_H ? game.SCORE_H[0] : "",
                        SCORE_C: game.SCORE_C ? game.SCORE_C[0] : "",

                        cTEAM_H: game.cTEAM_H ? game.cTEAM_H[0] : "", // 主队中文名称
                        cTEAM_C: game.cTEAM_C ? game.cTEAM_C[0] : "", // 客队中文名称
                        cLEAGUE: game.cLEAGUE ? game.cLEAGUE[0] : "", // 联赛中文名称

                        GID: game.GID ? game.GID[0] : "", // id
                        LEAGUE: game.LEAGUE ? game.LEAGUE[0] : "", // 联赛名称
                        DATETIME: game.DATETIME ? game.DATETIME[0] : "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                        TEAM_H: game.TEAM_H ? game.TEAM_H[0] : "", // 主队名称
                        TEAM_C: game.TEAM_C ? game.TEAM_C[0] : "", // 客队名称

                        RATIO_RE: game.RATIO_RE ? String(RATIO_RE) : "", // 让球

                        STRONG: game.STRONG ? game.STRONG[0] : "", // C 是客队让球 H是主队让球

                        IOR_REH: this.getHuangguanShui(
                            game.IOR_REH ? game.IOR_REH[0] : "",
                        ), // 主队让球水位
                        IOR_REC: this.getHuangguanShui(
                            game.IOR_REC ? game.IOR_REC[0] : "",
                        ), // 客队被让水位

                        IOR_ROUC: this.getHuangguanShui(
                            game.IOR_ROUC ? game.IOR_ROUC[0] : "",
                        ), // 大球水位
                        IOR_ROUH: this.getHuangguanShui(
                            game.IOR_ROUH ? game.IOR_ROUH[0] : "",
                        ), // 小球水位

                        RATIO_ROUO: String(RATIO_ROUO), // 大小
                        RATIO_ROUU: RATIO_ROUO, // 大小
                    });

                    if (game.A_sub_RATIO_RE) {
                        let A_sub_RATIO_RE = "";
                        if (game.A_sub_RATIO_RE) {
                            const l = game.A_sub_RATIO_RE[0].split("/");
                            if (l[1]) {
                                A_sub_RATIO_RE = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                A_sub_RATIO_RE = game.A_sub_RATIO_RE[0];
                            }
                        }
                        let A_sub_RATIO_ROUO = "";
                        if (game.A_sub_RATIO_ROUO) {
                            const l = game.A_sub_RATIO_ROUO[0].split("/");
                            if (l[1]) {
                                A_sub_RATIO_ROUO = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                A_sub_RATIO_ROUO = game.A_sub_RATIO_ROUO[0];
                            }
                        }
                        list.push({
                            RETIMESET: game.RETIMESET ? game.RETIMESET[0] : "",
                            SCORE_H: game.SCORE_H ? game.SCORE_H[0] : "",
                            SCORE_C: game.SCORE_C ? game.SCORE_C[0] : "",

                            cTEAM_H: game.cTEAM_H ? game.cTEAM_H[0] : "", // 主队中文名称
                            cTEAM_C: game.cTEAM_C ? game.cTEAM_C[0] : "", // 客队中文名称
                            cLEAGUE: game.cLEAGUE ? game.cLEAGUE[0] : "", // 联赛中文名称

                            GID: game.A_sub_GID ? game.A_sub_GID[0] : "", // id
                            LEAGUE: game.LEAGUE ? game.LEAGUE[0] : "", // 联赛名称
                            DATETIME: game.DATETIME ? game.DATETIME[0] : "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                            TEAM_H: game.TEAM_H ? game.TEAM_H[0] : "", // 主队名称
                            TEAM_C: game.TEAM_C ? game.TEAM_C[0] : "", // 客队名称

                            RATIO_RE: game.A_sub_RATIO_RE ? String(A_sub_RATIO_RE) : "", // 让球

                            STRONG: game.A_sub_STRONG ? game.A_sub_STRONG[0] : "", // C 是客队让球 H是主队让球

                            IOR_REH: this.getHuangguanShui(
                                game.A_sub_IOR_REH ? game.A_sub_IOR_REH[0] : "",
                            ), // 主队让球水位
                            IOR_REC: this.getHuangguanShui(
                                game.A_sub_IOR_REC ? game.A_sub_IOR_REC[0] : "",
                            ), // 客队被让水位

                            IOR_ROUC: this.getHuangguanShui(
                                game.A_sub_IOR_ROUC ? game.A_sub_IOR_ROUC[0] : "",
                            ), // 大球水位
                            IOR_ROUH: this.getHuangguanShui(
                                game.A_sub_IOR_ROUH ? game.A_sub_IOR_ROUH[0] : "",
                            ), // 小球水位

                            RATIO_ROUO: String(A_sub_RATIO_ROUO), // 大小
                            RATIO_ROUU: A_sub_RATIO_ROUO, // 大小
                        });
                    }
                    if (game.B_sub_RATIO_RE) {
                        let B_sub_RATIO_RE = "";
                        if (game.B_sub_RATIO_RE) {
                            const l = game.B_sub_RATIO_RE[0].split("/");
                            if (l[1]) {
                                B_sub_RATIO_RE = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                B_sub_RATIO_RE = game.B_sub_RATIO_RE[0];
                            }
                        }
                        let B_sub_RATIO_ROUO = "";
                        if (game.B_sub_RATIO_ROUO) {
                            const l = game.B_sub_RATIO_ROUO[0].split("/");
                            if (l[1]) {
                                B_sub_RATIO_ROUO = (Number(l[0]) + Number(l[1])) / 2;
                            } else {
                                B_sub_RATIO_ROUO = game.B_sub_RATIO_ROUO[0];
                            }
                        }
                        list.push({
                            RETIMESET: game.RETIMESET ? game.RETIMESET[0] : "",
                            SCORE_H: game.SCORE_H ? game.SCORE_H[0] : "",
                            SCORE_C: game.SCORE_C ? game.SCORE_C[0] : "",
                            cTEAM_H: game.cTEAM_H ? game.cTEAM_H[0] : "", // 主队中文名称
                            cTEAM_C: game.cTEAM_C ? game.cTEAM_C[0] : "", // 客队中文名称
                            cLEAGUE: game.cLEAGUE ? game.cLEAGUE[0] : "", // 联赛中文名称

                            GID: game.B_sub_GID ? game.B_sub_GID[0] : "", // id
                            LEAGUE: game.LEAGUE ? game.LEAGUE[0] : "", // 联赛名称
                            DATETIME: game.DATETIME ? game.DATETIME[0] : "", // 比赛时间 （有p结尾是下午 要加12 a是早上）
                            TEAM_H: game.TEAM_H ? game.TEAM_H[0] : "", // 主队名称
                            TEAM_C: game.TEAM_C ? game.TEAM_C[0] : "", // 客队名称

                            RATIO_RE: game.B_sub_RATIO_RE ? String(B_sub_RATIO_RE) : "", // 让球

                            STRONG: game.B_sub_STRONG ? game.B_sub_STRONG[0] : "", // C 是客队让球 H是主队让球

                            IOR_REH: this.getHuangguanShui(
                                game.B_sub_IOR_REH ? game.B_sub_IOR_REH[0] : "",
                            ), // 主队让球水位
                            IOR_REC: this.getHuangguanShui(
                                game.B_sub_IOR_REC ? game.B_sub_IOR_REC[0] : "",
                            ), // 客队被让水位

                            IOR_ROUC: this.getHuangguanShui(
                                game.B_sub_IOR_ROUC ? game.B_sub_IOR_ROUC[0] : "",
                            ), // 大球水位
                            IOR_ROUH: this.getHuangguanShui(
                                game.B_sub_IOR_ROUH ? game.B_sub_IOR_ROUH[0] : "",
                            ), // 小球水位

                            RATIO_ROUO: String(B_sub_RATIO_ROUO), // 大小
                            RATIO_ROUU: B_sub_RATIO_ROUO, // 大小
                        });
                    }
                }
            });
            list.sort(this.compare("DATETIME"));
            return list;
        },

        async zhiboLogin() {
            try {
                const res = await this.$axios({
                    url: `${this.zhibo.link}/membersite-api/api/member/authenticate`,
                    method: "post",
                    data: {
                        username: this.zhibo.username,
                        password: this.zhibo.password,
                    },
                });
                if (!res.data.token) {
                    this.$message.warning("智博登录失败");
                    return;
                }
                this.zhibo.token = res.data.token;
                localStorage.setItem("zhibo_token", res.data.token);
                // this.get_league_list_All();
                this.zhiboList();
                this.zhiboGunqiuList();
            } catch (err) {
                this.$message.warning("智博登录失败");
            }
        },
        async zhiboList() {
            // if (this.zhibo.isHttp) return;
            this.zhibo.isHttp = true;
            try {
                const { data } = await this.$axios({
                    url: `${
                        this.zhibo.link
                    }/membersite-api/api/data/events/1/2/0/4/3?_=${+new Date()}`,
                    method: "get",
                    headers: {
                        Locale: this.lang2,
                        Authorization: `Bearer ${this.zhibo.token}`,
                    },
                });

                const zhiboOldData = this.setZhiboGameList(data);
                if (this.zhiboOldData.length) {
                    this.zhiboOldData.forEach((game) => {
                        const map1 = zhiboOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        const map2 = this.zhiboOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) ===
                                    this.getText(item.RATIO_RE),
                        );
                        for (let k in map1) {
                            if (map1[k] !== map2[k]) {
                                map1[k] = map1[k] + "----变化";
                            }
                        }
                    });
                }
                this.zhiboNewData = zhiboOldData;
                this.$nextTick(() => {
                    this.zhiboOldData = this.setZhiboGameList(data);
                });
            } catch (err) {}

            this.zhibo.isHttp = false;
        },

        async zhiboGunqiuList() {
            try {
                const { data } = await this.$axios({
                    url: `${
                        this.zhibo.link
                    }/membersite-api/api/data/events/1/3/0/4/3?_=${+new Date()}`,
                    method: "get",
                    headers: {
                        Locale: this.lang2,
                        Authorization: `Bearer ${this.zhibo.token}`,
                    },
                });

                const zhiboGunqiuOldData = this.setZhiboGameList(data);
                if (this.zhiboGunqiuOldData.length) {
                    this.zhiboGunqiuOldData.forEach((game) => {
                        const map1 = zhiboGunqiuOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) === this.getText(item.RATIO_RE),
                        );
                        const map2 = this.zhiboGunqiuOldData.find(
                            (item) =>
                                game.GID === item.GID &&
                                this.getText(game.RATIO_RE) === this.getText(item.RATIO_RE),
                        );
                        for (let k in map1) {
                            if (map1[k] !== map2[k]) {
                                map1[k] = map1[k] + "----变化";
                            }
                        }
                    });
                }
                this.zhiboGunqiuNewData = zhiboGunqiuOldData;
                this.zhibo.loginStatus = true;
                this.$nextTick(() => {
                    this.zhiboGunqiuOldData = this.setZhiboGameList(data);
                });
            } catch(err) {
                console.log(err);
                this.zhibo.loginStatus = false;
            }
        },

        setZhiboGameList(result) {
            if (!result.schedule) return [];
            // type 为1 为今日或早盘 不然为滚球
            const leagues = result.schedule.leagues;
            const list = [];
            if (!leagues) return [];
            leagues.forEach((v) => {
                const events = v.events;
                events.forEach((game) => {
                    const markets = game.markets;
                    if (!markets[0]) return;
                    let RATIO_RE = markets[0].lines[0].marketSelections[0].handicap;
                    let IOR_REH = markets[0].lines[0].marketSelections[0].odds;
                    let IOR_REC = markets[0].lines[0].marketSelections[1].odds;

                    let RATIO_ROUO = markets[1].lines[0].marketSelections[0].handicap;
                    let IOR_ROUC = markets[1].lines[0].marketSelections[0].odds;
                    let IOR_ROUH = markets[1].lines[0].marketSelections[1].odds;
                    markets[1].lines.forEach((line) => {
                        RATIO_ROUO = line.marketSelections[0].handicap;
                        IOR_ROUC = line.marketSelections[0].odds;
                        IOR_ROUH = line.marketSelections[1].odds;
                        list.push({
                            GID: game.id, // id
                            LEAGUE: v.name, // 联赛名称
                            DATETIME: game.startTimeServer, // 比赛时间 （有p结尾是下午 要加12 a是早上）
                            TEAM_H: game.homeTeam, // 主队名称
                            TEAM_C: game.awayTeam, // 客队名称

                            RATIO_RE: "", // 让球

                            STRONG: "", // C 是客队让球 H是主队让球

                            IOR_REH: "", // 主队让球水位
                            IOR_REC: "", // 客队被让水位

                            IOR_ROUC: IOR_ROUC, // 大球水位
                            IOR_ROUH: IOR_ROUH, // 小球水位

                            RATIO_ROUO: RATIO_ROUO, // 大小
                            RATIO_ROUU: RATIO_ROUO, // 大小
                        });
                    });
                    markets[0].lines.forEach((line) => {
                        RATIO_RE = line.marketSelections[0].handicap;
                        IOR_REH = line.marketSelections[0].odds;
                        IOR_REC = line.marketSelections[1].odds;
                        list.push({
                            GID: game.id, // id
                            LEAGUE: v.name, // 联赛名称
                            DATETIME: game.startTimeServer, // 比赛时间 （有p结尾是下午 要加12 a是早上）
                            TEAM_H: game.homeTeam, // 主队名称
                            TEAM_C: game.awayTeam, // 客队名称

                            RATIO_RE: String(Math.abs(RATIO_RE)), // 让球

                            STRONG: RATIO_RE > 0 ? "C" : "H", // C 是客队让球 H是主队让球

                            IOR_REH: IOR_REH, // 主队让球水位
                            IOR_REC: IOR_REC, // 客队被让水位

                            IOR_ROUC: "", // 大球水位
                            IOR_ROUH: "", // 小球水位

                            RATIO_ROUO: "", // 大小
                            RATIO_ROUU: "", // 大小
                        });
                    });
                });
            });
            list.sort(this.compare("DATETIME"));
            return list;
        },
        zhiboStart() {
            this.zhiboClose();
            this.timer3 = setInterval(() => {
                if (!this.active) return;
                if (!this.dataRadio.includes('jinri')) return;
                this.zhiboList();
            }, 1000);

            this.timer4 = setInterval(() => {
                if (!this.active) return;
                if (!this.dataRadio.includes('gunqiu')) return;
                this.zhiboGunqiuList();
            }, 1000);
        },
        zhiboClose() {
            clearInterval(this.timer3);
            clearInterval(this.timer4);
        },
        async pingboLogin() {
            try {
                const res = await this.$axios({
                    url: `${this.pingbo.link}/member-service/v2/login?locale=${
                        this.lang2
                    }&_=${+new Date()}&withCredentials=true`,
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        captcha: "",
                        captchaToken: "",
                        loginId: this.pingbo.username,
                        password: this.pingbo.password,
                    },
                });
                if (!res.data) {
                    this.$message.warning("平博登录失败");
                    return;
                }
                this.pingbo.loginStatus = true;
                this.pingboList();
            } catch (err) {
                this.pingbo.loginStatus = false;
                this.$message.warning("平博登录失败");
            }
        },
        async pingboList() {
            // if (this.pingbo.isHttp) return;
            this.pingbo.isHttp = true;
            try {
                const { data } = await this.$axios({
                    url: `${
                        this.pingbo.link
                    }/sports-service/sv/compact/events?btg=1&c=&cl=3&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=3&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1%2C8%2C39%2C2%2C3%2C6%2C7%2C4%2C5&pn=-1&pv=1&sp=29&tm=0&v=0&locale=${
                        this.lang2
                    }&_=${+new Date()}&withCredentials=true`,
                    method: "get",
                });
                if (this.dataRadio.includes('jinri')) {
                    const { jinList } = this.setpingboGameList(data);
                    const pingboOldData = [...jinList];
                    if (this.pingboOldData.length) {
                        this.pingboOldData.forEach((game) => {
                            const map1 = pingboOldData.find(
                                (item) =>
                                    game.GID === item.GID &&
                                    this.getText(game.RATIO_RE) ===
                                        this.getText(item.RATIO_RE),
                            );
                            const map2 = this.pingboOldData.find(
                                (item) =>
                                    game.GID === item.GID &&
                                    this.getText(game.RATIO_RE) ===
                                        this.getText(item.RATIO_RE),
                            );
                            for (let k in map1) {
                                if (map1[k] !== map2[k]) {
                                    map1[k] = map1[k] + "----变化";
                                }
                            }
                        });
                    }
                    this.pingboNewData = pingboOldData;
                    this.$nextTick(() => {
                        const { jinList } = this.setpingboGameList(data);
                        this.pingboOldData = jinList;
                    });
                }
                if (this.dataRadio.includes('gunqiu')) {
                    const { gunList } = this.setpingboGameList(data);
                    const pingboGunqiuOldData = [...gunList];
                    if (this.pingboGunqiuOldData.length) {
                        this.pingboGunqiuOldData.forEach((game) => {
                            const map1 = pingboGunqiuOldData.find(
                                (item) =>
                                    game.GID === item.GID &&
                                    this.getText(game.RATIO_RE) ===
                                        this.getText(item.RATIO_RE),
                            );
                            const map2 = this.pingboGunqiuOldData.find(
                                (item) =>
                                    game.GID === item.GID &&
                                    this.getText(game.RATIO_RE) ===
                                        this.getText(item.RATIO_RE),
                            );
                            for (let k in map1) {
                                if (map1[k] !== map2[k]) {
                                    map1[k] = map1[k] + "----变化";
                                }
                            }
                        });
                    }
                    this.pingboGunqiuNewData = pingboGunqiuOldData;
                    this.$nextTick(() => {
                        const { gunList } = this.setpingboGameList(data);
                        this.pingboGunqiuOldData = gunList;
                    });
                }
            } catch (err) {
                console.log('err----', err);
            }
            this.pingbo.isHttp = false;
        },

        setpingboGameList(result) {
            // type 为1 为今日或早盘 不然为滚球
            const gunqiu = result.l[0][2];
            const jinri = result.n[0][2];
            const gunList = [];
            const jinList = [];
            if (!gunqiu) return [];
            [
                {
                    list: gunqiu,
                    newList: gunList,
                },
                {
                    list: jinri,
                    newList: jinList,
                },
            ].forEach((map) => {
                map.list.forEach((v) => {
                    const events = v[2];
                    events.forEach((game) => {
                        const bisai = game[8][0];
                        if (!bisai) return;
                        bisai[0] && bisai[0].forEach((line) => {
                            let RATIO_RE = line[0];
                            const IOR_REH = line[3];
                            const IOR_REC = line[4];
                            let RATIO_ROUO = "";
                            const IOR_ROUC = "";
                            const IOR_ROUH = "";

                            if (RATIO_RE && typeof RATIO_RE === "string") {
                                const l = RATIO_RE.split("-");
                                if (l[1]) {
                                    RATIO_RE = (Number(l[0]) + Number(l[1])) / 2;
                                }
                            }
                            if (RATIO_ROUO && typeof RATIO_ROUO === "string") {
                                const l = RATIO_ROUO.split("-");
                                if (l[1]) {
                                    RATIO_ROUO = (Number(l[0]) + Number(l[1])) / 2;
                                }
                            }
                            map.newList.push({
                                GID: game[0], // id
                                LEAGUE: game[1], // 联赛名称
                                DATETIME: new Date(game[4]).Format(
                                    "yyyy-MM-dd hh:mm:ss",
                                ), // 比赛时间 （有p结尾是下午 要加12 a是早上）
                                TEAM_H: game[1], // 主队名称
                                TEAM_C: game[2], // 客队名称

                                RATIO_RE: String(Math.abs(RATIO_RE)), // 让球

                                STRONG: Number(RATIO_RE) < 0 ? "C" : "H", // C 是客队让球 H是主队让球

                                IOR_REH: IOR_REH, // 主队让球水位
                                IOR_REC: IOR_REC, // 客队被让水位

                                IOR_ROUC: IOR_ROUC, // 大球水位
                                IOR_ROUH: IOR_ROUH, // 小球水位

                                RATIO_ROUO: RATIO_ROUO, // 大小
                                RATIO_ROUU: RATIO_ROUO, // 大小
                            });
                        });

                        bisai[1] && bisai[1].forEach((line) => {
                            let RATIO_RE = "";
                            const IOR_REH = "";
                            const IOR_REC = "";
                            let RATIO_ROUO = line[0];
                            const IOR_ROUC = line[2];
                            const IOR_ROUH = line[3];

                            if (RATIO_RE && typeof RATIO_RE === "string") {
                                const l = RATIO_RE.split("-");
                                if (l[1]) {
                                    RATIO_RE = (Number(l[0]) + Number(l[1])) / 2;
                                }
                            }
                            if (RATIO_ROUO && typeof RATIO_ROUO === "string") {
                                const l = RATIO_ROUO.split("-");
                                if (l[1]) {
                                    RATIO_ROUO = (Number(l[0]) + Number(l[1])) / 2;
                                }
                            }
                            map.newList.push({
                                GID: game[0], // id
                                LEAGUE: game[1], // 联赛名称
                                DATETIME: new Date(game[4]).Format(
                                    "yyyy-MM-dd hh:mm:ss",
                                ), // 比赛时间 （有p结尾是下午 要加12 a是早上）
                                TEAM_H: game[1], // 主队名称
                                TEAM_C: game[2], // 客队名称

                                RATIO_RE: String(Math.abs(RATIO_RE)), // 让球

                                STRONG: Number(RATIO_RE) < 0 ? "C" : "H", // C 是客队让球 H是主队让球

                                IOR_REH: IOR_REH, // 主队让球水位
                                IOR_REC: IOR_REC, // 客队被让水位

                                IOR_ROUC: IOR_ROUC, // 大球水位
                                IOR_ROUH: IOR_ROUH, // 小球水位

                                RATIO_ROUO: RATIO_ROUO, // 大小
                                RATIO_ROUU: RATIO_ROUO, // 大小
                            });
                        });
                    });
                });
            });
            jinList.sort(this.compare("DATETIME"));
            gunList.sort(this.compare("DATETIME"));
            return {
                jinList,
                gunList,
            };
        },
        pingboStart() {
            this.pingboClose();
            this.timer5 = setInterval(() => {
                if (!this.active) return;
                this.pingboList();
            }, 1000);
        },
        pingboClose() {
            clearInterval(this.timer5);
        },
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: "Source Sans Pro", sans-serif;
}
.data-changed-cell {
    background-color: #f0f9eb !important; /* 高亮颜色 */
}
@keyframes blink {
    0% {
        background: red;
        color: #fff;
    }
    50% {
        background: transparent;
        color: #000;
    }
    100% {
        background: red;
        color: #fff;
    }
}

.change {
    /*  border-radius: 5px;*/
    /* margin: 20px 0; */
    /* animation: blink 1.5s; */
    /* animation: blink 1.5s infinite; */
    background: red;
    color: #fff;
}
.from {
    display: flex;
}
.el-form {
    margin-left: 20px;
}
h4 {
    background: blue;
    padding: 20px;
    color: #fff;
}
.table {
    display: flex;
}
#liji {
    display: none;
}
</style>
