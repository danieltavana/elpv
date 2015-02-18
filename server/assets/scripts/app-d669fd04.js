"use strict";angular.module("client",["ngAnimate","ui.router","ui.bootstrap","client.pv","client.auth"]).config(["$stateProvider","$urlRouterProvider",function(e,i){e.state("signup",{url:"/signup",templateUrl:"app/auth/signup.html",controller:"SignupController",data:{access:0}}).state("login",{url:"/login",templateUrl:"app/auth/login.html",controller:"LoginController",data:{access:0}}).state("home",{url:"/home",templateUrl:"app/main/main.html",controller:"MainCtroller",data:{access:0}}).state("newpv",{url:"/newpv",templateUrl:"app/pv/newpv.html",controller:"PvController",data:{access:1}}).state("review",{url:"/review",templateUrl:"app/review/review.html",controller:"ReviewController",data:{access:0}}),i.otherwise("/home")}]),angular.module("client").controller("NavbarCtrl",["$scope",function(){}]),angular.module("client.pv",[]).factory("PvDataService",["$q","$http",function(e,i){return{getPv:function(t){var a=e.defer(),n=i.post("http://localhost:1337/api/v1/pv/preparePv",t);return n.then(function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},savePv:function(t){var a=e.defer(),n=i.post("http://localhost:1337/api/v1/pv/createPv",t);return n.then(function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise}}}]),angular.module("client.pv").controller("ReviewController",["$scope","PvDataService","$http",function(e,i,t){e.serverParams={name:"SOUSSE",circ:20},e.circoptions=[{name:"SOUSSE",circ:20},{name:"TUNIS1",circ:1},{name:"TUNIS2",circ:2},{name:"BEN AROUS",circ:3},{name:"ARIANA",circ:4},{name:"MANOUBA",circ:5},{name:"JENDOUBA",circ:6},{name:"KEF",circ:7},{name:"SILINANA",circ:8},{name:"BIZERTE",circ:9},{name:"BEJA",circ:10},{name:"NABEUL1",circ:11},{name:"NABEUL2",circ:12},{name:"ZAGHOUANE",circ:13},{name:"KAIROUAN",circ:14},{name:"KASSERINE",circ:15},{name:"SIDI BOUZID",circ:16},{name:"GAFSA",circ:17},{name:"TOZEUR",circ:18},{name:"KEBELLI",circ:19},{name:"MAHDIA",circ:21},{name:"MONASTIR",circ:22},{name:"SFAX1",circ:23},{name:"SFAX2",circ:24},{name:"GABES",circ:25},{name:"MEDENINE",circ:26},{name:"TATAOUINE",circ:27}],e.getpvs=function(){console.log(e.serverParams),t.post("/suivi",e.serverParams).success(function(i){e.pvlist=i,e.missedNumber=e.pvlist.nopv.length,e.errorNumber=e.pvlist.twopv.length,e.oneNumber=e.pvlist.onepv.length}).error(function(i){e.errorMsg=i})},e.savePv=function(e){e.corrected=!0,console.log(e),t.post("/updatepv",e).success(function(){alert("PV mis a jour "),$("html, body").animate({scrollTop:250},800)}).error(function(){alert("############ ERREUR ############"),console.log("error")})},e.getDetails=function(i,a,n){console.log(a),console.log(n),t.post("/pvdetails"+i).success(function(i){console.log("fetched"),e.pvlist.twopv[n][a].lists=i.lists}).error(function(){})}}]),angular.module("client.pv").controller("PvController",["$scope","PvDataService",function(e,i){$("html, body").animate({scrollTop:0},800),e.pvTemplate={},e.pvStatus="INITILIAZED",e.getPv=function(){var t=i.getPv(e.pvTemplate);t.then(function(i){e.pvStatus="FOUND",e.message="",e.pvTemplate=i.data,console.log(e.pvTemplate)},function(i){e.message="ERROR: "+i.data,e.pvStatus="NOTFOUND"})},e.isSaving=!1,e.savePv=function(){e.pvTemplate.election="Legislatives",e.signatures.forEach(function(e){e.list&&(e.name=e.list.name,delete e.list)}),e.pvTemplate.partySingatures=e.signatures,e.isSaving=!0,console.log(e.pvTemplate);var t=i.savePv(e.pvTemplate);t.then(function(){e.message="Saved successfully",$("html, body").animate({scrollTop:0},800)},function(){e.message="error saving",e.isSaving=!1,$("html, body").animate({scrollTop:0},800)})},e.signatures=[],e.elections=["Legislatives","pres round1","pres round2"]}]),angular.module("client").controller("MainCtroller",["$scope",function(){}]),angular.module("client.auth",[]).factory("Storage",function(){return{get:function(e){return localStorage.getItem(e)},set:function(e,i){return localStorage.setItem(e,i)},unset:function(e){return localStorage.removeItem(e)}}}),angular.module("client.auth").controller("SignupController",["$scope","$state","Auth","$http",function(e,i,t){$("html, body").animate({scrollTop:0},800),t.isAuthenticated()&&i.go("newpv"),e.credentials={identifier:"",password:""},e.signup=function(){e.signupFrom.$valid&&t.signup(e.credentials)}}]).controller("LoginController",["$scope","$state","Auth","$http",function(e,i,t){$("html, body").animate({scrollTop:0},800),t.isAuthenticated()&&i.go("newpv"),e.credentials={identifier:"",password:""},e.login=function(){e.loginForm.$valid&&t.login(e.credentials)}}]),angular.module("client.auth").factory("Auth",["$http","$state","Storage",function(e,i,t){return{authorize:function(e){var a=t.get("user");if(!a)return e>0?(event.preventDefault(),i.go("anon.login"),!1):!0;switch(e){case 0:return!0;case 1:var n=JSON.parse(a);return"staff"==n.role?!0:!1;default:return!1}},isAuthenticated:function(){return t.get("auth_token")},login:function(a){return console.log("authlogin"),e.post("/api/v1/user/login",a).success(function(){e.post("/api/v1/auth/login",a).success(function(n){t.set("user",JSON.stringify(n)),e.post("/api/v1/user/jwt",a).success(function(e){t.set("auth_token",JSON.stringify(e)),i.go("user.newpv")})}).error(function(){alert("mot de passe incorrect ")})}).error(function(){alert("utilisateur inexistant ")})},signup:function(a){return console.log("signing up"),e.post("/api/v1/user/signup",a).success(function(){e.post("/api/v1/auth/login",a).success(function(n){t.set("user",JSON.stringify(n)),e.post("/api/v1/user/jwt",a).success(function(e){t.set("auth_token",JSON.stringify(e)),i.go("user.newpv")})})}).error(function(){alert("utilisateur existant ")})},logout:function(){t.unset("auth_token"),t.unset("user"),i.go("anon.login")}}}]),angular.module("client").run(["$templateCache",function(e){e.put("app/auth/login.html",'<div class="box-login"><h3>Connexion</h3><p>Veuillez entrer votre email et mot de passe pour vous connecter</p><form class="form-login" name="loginForm" novalidate=""><fieldset><div class="form-group"><span class="input-icon"><input type="text" class="form-control" name="email" placeholder="Email" data-ng-model="credentials.email" required=""> <i class="fa fa-user"></i></span></div><div class="form-group form-actions"><span class="input-icon"><input type="password" class="form-control password" name="password" placeholder="Mot de passe" data-ng-model="credentials.password" required=""> <i class="fa fa-lock"></i></span></div><div class="form-actions"><button type="submit" class="btn btn-primary pull-right" data-ng-click="login()">Se connecter <i class="fa fa-arrow-circle-right"></i></button></div><div class="new-account">Nouveau? <a ui-sref="signup" class="signup">Créer un compte</a></div></fieldset></form></div>'),e.put("app/auth/signup.html",'<div class="box-signup"><h3>Enregistrement</h3><p>Veuillez entrer votre email et mot de passe pour créer votre compte</p><form class="form-signup" name="signupForm" novalidate=""><fieldset><div class="form-group"><span class="input-icon"><input type="email" class="form-control" name="email" placeholder="Email" data-ng-model="credentials.email" required=""> <i class="fa fa-envelope"></i></span></div><div class="form-group"><span class="input-icon"><input type="password" class="form-control" id="password" name="password" placeholder="mot de passe" data-ng-model="credentials.password" required=""> <i class="fa fa-lock"></i></span></div><div class="form-group"><span class="input-icon"><input type="password" class="form-control" name="password_again" placeholder="confirmation mot de passe" data-ng-model="credentials.passwordConf" required=""> <i class="fa fa-lock"></i></span></div><div class="form-actions"><a class="btn btn-light-grey go-back" ui-sref="home"><i class="fa fa-circle-arrow-left"></i> Retour</a> <button type="submit" class="btn btn-primary pull-right" data-ng-click="signup()">Créer <i class="fa fa-arrow-circle-right"></i></button></div></fieldset></form></div>'),e.put("app/main/main.html",'<div class="container"><div ng-include="\'components/navbar/navbar.html\'"></div><div class="row"></div><hr><div class="footer"><p>With ♥</p></div></div>'),e.put("app/pv/newpv.html",'<div class="container"><div ng-include="\'components/navbar/navbar.html\'"></div><div class="row"><div class="col-md-3 arabic">الدائرة الانتخابية <label>{{pvTemplate.circName}}</label></div><div class="col-md-9 arabic">مركز الاقتراع<h2>{{pvTemplate.centerName}}</h2></div></div><div class="row"><form name="getpv" class="input-form" novalidate=""><div class="col-md-2 arabic">مكتب الاقتراع <input type="number" ng-pattern="/^[0-9]{1,7}$/" required="" ng-model="pvTemplate.station"></div><div class="col-md-2 arabic">مركز الاقتراع <input type="number" ng-pattern="/^[0-9]{1,7}$/" required="" ng-model="pvTemplate.center"></div><div class="col-md-2 arabic">العمادة <input type="number" ng-pattern="/^[0-9]{1,7}$/" required="" ng-model="pvTemplate.subDeleg"></div><div class="col-md-2 arabic">المعتمدية <input type="number" ng-pattern="/^[0-9]{1,7}$/" required="" ng-model="pvTemplate.deleg"></div><div class="col-md-2 arabic">الدائرة الانتخابية <input ng-model="pvTemplate.circ" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div><div class="col-md-2 arabic"><input type="submit" class="btn btn-success unique-submit arabic" ng-click="getPv()"></div></form></div><hr><div class="messages">{{message}}</div><div class="pv-container" ng-if="pvStatus ==\'NOTFOUND\'"></div><div class="pv-container" ng-if="pvStatus ==\'FOUND\'"><form novalidate="" name="prep" class="input-form"><div class=""><div class="row"><div class="col-md-3 arabic">يوجد ختم الهيئة؟ <input type="checkbox" ng-model="pvTemplate.tampon"><br></div></div><hr><div class="row"><div class="col-md-3 arabic"><div>عدد الناخبين المرسمين بمكتب الاقتراع <input ng-model="pvTemplate.registeredVoters" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-3 arabic"><div>أ- عدد الناخبين الذين امضوا في قائمة الناخبين <input ng-model="pvTemplate.aSigningVoters" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ب- عدد أوراق التصويت المسلمة لمكتب الاقتراع <input ng-model="pvTemplate.bDeliveredBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ج- عدد أوراق التصويت التالفة <input ng-model="pvTemplate.cSpoiledBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>د- عدد أوراق التصويت الباقية <input ng-model="pvTemplate.dLeftBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></div><hr><div class="row"><div class="col-md-3 arabic"><div>ه- عدد أوراق التصويت التالفة + عدد أوراق التصويت الباقية <input ng-model="pvTemplate.eCplusD" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-3 arabic"><div>و- عدد أوراق التصويت المستخرجة من الصندوق <input ng-model="pvTemplate.fExtractedBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ز=ه+و <input ng-model="pvTemplate.gEplusF" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ح- المطابقة 1 : الفارق العددي بين ب و- ز <input ng-model="pvTemplate.hBminusG" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ط- المطابقة 2 : الفارق العددي بين أ و و <input ng-model="pvTemplate.iAminusF" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></div><hr><div class="row"><div class="col-md-4 arabic"><div>أسباب عدم التطابق في ح إن وجد <input ng-model="pvTemplate.hReasons" type="text" style="width: 100%;"></div></div><div class="col-md-4 arabic"><div>أسباب عدم التطابق في ط إن وجد <input ng-model="pvTemplate.iReasons" style="width: 100%;" type="text"></div></div></div></div><div class="row arabic"><h3>القائمات</h3><ul class="lists"><li ng-repeat="list in pvTemplate.lists" class="list"><div class="row"><div class="right"><label>{{list.number}}</label></div><div class="right"><label class="med-label">{{list.name}}</label></div><div class="right"><input ng-model="list.voteCast" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></li></ul><hr><div class="row"><div class="col-md-3 arabic"><div>ي- الأصوات المصرح بها لكل القائمات <input ng-model="pvTemplate.jListVotes" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-3 arabic"><div>ك- عدد أوراق التصويت الملغاة <input ng-model="pvTemplate.kCancelledVotes" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ل- عدد أوراق التصويت البيضاء <input ng-model="pvTemplate.lBlankVotes" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>م) المجموع = ي+ ك+ ل <input ng-model="pvTemplate.mJplusKplusL" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-2 arabic"><div>ن- المطابقة 3 : الفارق العددي بين و و م <input ng-model="pvTemplate.nFminusM" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></div><hr><div class="row"><div class="col-md-8 right">أسباب عدم التطابق في ن إن وجد <input ng-model="pvTemplate.nReasons" type="text" style="width: 100%;"></div><div class="col-md-2 arabic"><div>توقيت بداية الفرز <input ng-model="pvTemplate.countingStart" type="text"></div></div><div class="col-md-2 arabic"><div>توقيت ختم الفرز <input ng-model="pvTemplate.countingEnd" type="text"></div></div></div><hr><div class="row"><h3>ممثلي الأحزاب</h3><ul class="lists"><li ng-repeat="signature in signatures" class="list"><select ng-model="signature.list" ng-options="list.name for list in pvTemplate.lists">Signatures:</select><input ng-model="signature.signaturesCount"> [ <a href="" ng-click="signatures.splice($index, 1)">X</a>]</li><li>[<a href="" ng-click="signatures.push({})">ADD</a>]</li></ul></div><input type="submit" ng-click="savePv()" class="btn btn-success unique-submit arabic" ng-disabled="isSaving"></div></form></div><div class="footer"><p>With ♥</p></div></div>'),e.put("app/review/editpv.html",'<div id="{{pvTemplate.id}}"><div class="panel-heading"><div class="col md-3"><label>{{pvTemplate.circonscriptionName}}</label></div><div class="col md-3" style="text-align: center;direction: ltr;"><h3>{{pvTemplate.circonscriptionId}} - {{pvTemplate.delegationId}} - {{pvTemplate.subDelegationId}} - {{pvTemplate.centerID}} - {{pvTemplate.stationId}}</h3><h4>{{pvTemplate.PollingCenterName}}</h4></div></div><div class="election" ng-if="pvTemplate"><form novalidate="" name="prep"><div class=""><div class="row"><div class="col-md-12 arabic">يوجد ختم الهيئة؟ <input type="checkbox" ng-model="pvTemplate.tampon"><br></div></div><hr><div class="row"><div class="col-md-12 arabic"><div>عدد الناخبين المرسمين بمكتب الاقتراع <input ng-model="pvTemplate.registeredVoters" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>أ- عدد الناخبين الذين امضوا في قائمة الناخبين <input ng-model="pvTemplate.aSigningVoters" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ب- عدد أوراق التصويت المسلمة لمكتب الاقتراع <input ng-model="pvTemplate.bDeliveredBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ج- عدد أوراق التصويت التالفة <input ng-model="pvTemplate.cSpoiledBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>د- عدد أوراق التصويت الباقية <input ng-model="pvTemplate.dLeftBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></div><hr><div class="row"><div class="col-md-12 arabic"><div>ه- عدد أوراق التصويت التالفة + عدد أوراق التصويت الباقية <input ng-model="pvTemplate.eCplusD" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>و- عدد أوراق التصويت المستخرجة من الصندوق <input ng-model="pvTemplate.fExtractedBallots" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ز=ه+و <input ng-model="pvTemplate.gEplusF" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ح- المطابقة 1 : الفارق العددي بين ب و- ز <input ng-model="pvTemplate.hBminusG" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ط- المطابقة 2 : الفارق العددي بين أ و و <input ng-model="pvTemplate.iAminusF" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></div><hr><div class="row arabic"><div class="col-md-12"><div>أسباب عدم التطابق في ح إن وجد <input ng-model="pvTemplate.hReasons" type="text" style="width: 100%;"></div></div></div><div class="row arabic"><div class="col-md-12"><div>أسباب عدم التطابق في ط إن وجد <input ng-model="pvTemplate.iReasons" style="width: 100%;" type="text"></div></div></div></div><div class="row arabic"><div class="row"><div class="col-md-12 arabic"><div>ي- الأصوات المصرح بها لكل القائمات <input ng-model="pvTemplate.jListVotes" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ك- عدد أوراق التصويت الملغاة <input ng-model="pvTemplate.kCancelledVotes" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ل- عدد أوراق التصويت البيضاء <input ng-model="pvTemplate.lBlankVotes" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>م) المجموع = ي+ ك+ ل <input ng-model="pvTemplate.mJplusKplusL" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div><div class="col-md-12 arabic"><div>ن- المطابقة 3 : الفارق العددي بين و و م <input ng-model="pvTemplate.nFminusM" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></div><hr><div class="row"><div class="col-md-8 right">أسباب عدم التطابق في ن إن وجد <input ng-model="pvTemplate.nReasons" type="text" style="width: 100%;"></div><div class="col-md-12 arabic"><div>توقيت بداية الفرز <input ng-model="pvTemplate.countingStart" type="text"></div></div><div class="col-md-12 arabic"><div>توقيت ختم الفرز <input ng-model="pvTemplate.countingEnd" type="text"></div></div></div><hr><h3><a ng-click="getDetails(pvTemplate.id,$index,sectionIndex)" style="cursor: pointer;">القائمات</a></h3><ul class="lists"><li ng-repeat="list in pvTemplate.lists" class="list"><div class="row"><div class="right"><label class="med-label">{{list.candidateName}}</label></div><div class="right"><input ng-model="list.votesCount" type="number" ng-pattern="/^[0-9]{1,7}$/" required=""></div></div></li></ul><hr><input type="submit" ng-click="savePv(pvTemplate)" ng-disabled="isSaving"></div></form></div></div>'),e.put("app/review/review.html",'<div class="container"><div ng-include="\'components/navbar/navbar.html\'"></div><div class="row left"><div class="col-md-3">Veuillez choisir la circonscription<select ng-model="serverParams.circ" ng-options="c.circ as c.name for c in circoptions"></select><input type="submit" ng-click="getpvs()"></div></div><hr><div class="row left"><h3>PVs manquants - {{missedNumber}}</h3><div class="row"><div class="col-md-2" ng-repeat="pv in pvlist.nopv"><span>{{pv}}</span></div></div></div><div class="row left"><h3>PVs a resaisir une fois - {{oneNumber}}</h3><div class="row"><div class="col-md-2" ng-repeat="pv in pvlist.onepv"><span>{{pv}}</span></div></div></div><h3>PVs erronnes - {{errorNumber}}</h3><div class="row pv-row" ng-repeat="pvCouple in pvlist.twopv" ng-init="sectionIndex = $index"><div class="col-md-6 pv-zone" ng-repeat="pvTemplate in pvCouple"><div ng-include="" src="\'app/review/editpv.html\'"></div></div></div></div>'),e.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#/home"><span class="glyphicon glyphicon-home"></span> ELPV</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li><a ui-sref="home" ui-sref-active="active">Home</a></li><li><a ui-sref="newpv" ui-sref-active="active">New PV</a></li><li><a ui-sref="review" ui-sref-active="active">Review</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a ui-sref="login" ui-sref-active="active">Login</a></li></ul></div></div></nav>')}]);