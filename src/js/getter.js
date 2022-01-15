function getScrollHeight(elm){
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
}
function onExpandableTextareaInput({ target:elm }){
    // make sure the input event originated from a textarea and it's desired to be auto-expandable
    if( !elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA' ) return

    var minRows = elm.getAttribute('data-min-rows')|0, rows;
    !elm._baseScrollHeight && getScrollHeight(elm)

    elm.rows = minRows
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
    elm.rows = minRows + rows
}
// global delegated event listener
document.addEventListener('input', onExpandableTextareaInput)

function dashboardLinkFormatter(value, row) {
    return "<a href='"+row.link+"' target=\"_blank\">"+value+"</a>";
}
function pocLinkFormatter(value) {
    if (value.match(/https/)){
        let links = value.split("\n");
        links = links.map(e => e.replace("$","' target=\"_blank\">"+ e +"</a>"));
        links = links.map(e => e.replace("^","<a href='"));
        return links.join("\n");
    }
    else {
        return value;
    }
}
function formatTime(t) {
    return new Date(t * 1e3).toLocaleDateString();
}
function formatTrackId(value, row) {
    return 'INC-' + value;
}
function setReferrerHeader(referrerName) {
    Object.defineProperty(document, "referrer", {
      get: function () { return referrerName; },
    });
}
function hasValueDeep(json, findValue) {
    const values = Object.values(json);
    let hasValue = values.includes(findValue);
    values.forEach(function(value) {
        if (typeof value === "object") {
            hasValue = hasValue || hasValueDeep(value, findValue);
        }
    })
    return hasValue;
}
function getArrayIndexByKey(sKey, sArray){
    for (var i=0; i < sArray.length; i++) {
        var allkeys = Object.keys(sArray[i])
        if (allkeys.includes(sKey)){
            return i;
        }
    }
}
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
function createId(type) {
    return type + "--" + (uuidv4());
}
function changePage(id) {
    try {
        window.location.hash = `#${id}`;
        $('.tabcontent2').hide();
        $(`.${id}`).show();
    } catch {
        $('.error').show();
    }
}
function clearAllObs() {

    $('.obRow').hide();
    $('.obColumn').hide();
    $('.infoColumn').hide();
    $('.intLinks').hide();
    $('.extLinks').hide();
    $('.splunkLinks').hide();
    localStorage.removeItem('bundle');
    localStorage.removeItem('info');
    localStorage.removeItem('pdns');
    localStorage.removeItem('ipInfo');
    document.getElementById('outOb').innerHTML = '';
}
function promptAllObs() {
    document.getElementById('obContent').innerHTML = "<p class=\"text-warning\">Delete all observables?</p>";
}
function determineType(value) {

    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
        if (/(^127\.)|(^10\.)|(^192\.168\.)|(^172.(1[6-9]|2[0-9]|3[0-1])\.)/.test(value)){
            return local-addr;
        }
        else {
            return 'ipv4-addr'
        }
    } else if (/^http/.test(value)) {
        return 'url';
    } else if (/\./.test(value)) {
        return 'domain-name';
    } else {
        return '-';
    }
}
function createLsBundle(){
    var dict = {
        "id": createId('bundle'),
        "type": "bundle",
        "objects": []
    };
    localStorage.setItem("bundle", JSON.stringify(dict));
}
function copyStix() {
    var copyText = document.getElementById("stixContent");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById('copyAlert').innerHTML = "Copied!";
}
function createLs(name) {
    let array = [];
    localStorage.setItem(`${name}`, JSON.stringify(array));
}
function createLsPdns() {
    let array = [];
    localStorage.setItem("pdns", JSON.stringify(array));
}
function createLsIpInfo() {
    let array = [];
    localStorage.setItem("ipInfo", JSON.stringify(array));
}
function addToLsBundle(obj){
    let array = JSON.parse(localStorage.getItem('bundle'));
    array.objects.push(obj);
    localStorage.setItem("bundle", JSON.stringify(array));

    document.getElementById('stixContent').innerHTML = JSON.stringify(array, undefined, 4);
}
function addToLsInfo(obj){
    var array = JSON.parse(localStorage.getItem('info'));
    array.push(obj);
    localStorage.setItem("info", JSON.stringify(array));
}

function changeDisplay(type) {
    $('.intLinks').hide();
    $('.extLinks').hide();
    $('.splunkLinks').hide();
    $('card-body').show();
    $('.obColumn').show();
    $('.whoisDiv').hide();
    $('.pocDiv').hide();
    if (type == "ipv4-addr") {
        $('.intAddressLinks').show();
        $('.extAddressLinks').show();
        $('.splunkAddressLinks').show();
    } else if (type == "domain-name") {
        $('.intDomainLinks').show();
        $('.extDomainLinks').show();
        $('.splunkDomainLinks').show();
    } else if (type == "url") {
        $('.intUrlLinks').show();
        $('.extUrlLinks').show();
        $('.splunkUrlLinks').show();
    } else {
        return (false)
    }
}
function reverseAddress(a) {
    return a.split(".").reverse().join(".");
}

function modifyLsBundle(obsObj, dict){
    var bundleList = JSON.parse(localStorage.getItem('bundle'));
    var target = bundleList.objects.filter(obj => {
        return obj.value === obsObj.value
    });

    if (target) {
        const index = bundleList.objects.indexOf(target[0]);
        target[0] = Object.assign(dict, target[0])
        if (index > -1) {
            bundleList.objects.splice(index, 1);
        }
        bundleList.objects.push(target[0]);
        localStorage.setItem("bundle", JSON.stringify(bundleList));
    }
}
function modifyLsInfo(value, infoEntry){

    var infoList = JSON.parse(localStorage.getItem("info"));
    var index = getArrayIndexByKey(value, infoList);
    var Entries = [];
    Entries.push(infoEntry);

    if (index){
        Entries.push(infoList[index][value]);
        infoList.splice(index, 1);
    }

    var infoOb = {[value]:Entries}
    infoList.push(infoOb);
    localStorage.setItem("info", JSON.stringify(infoList));
}
function modifyLsPdns(value, pdnsEntry){
    var pdnsList = JSON.parse(localStorage.getItem("pdns"));
    var index = getArrayIndexByKey(value, pdnsList);
    var Entries = [];
    Entries.push(pdnsEntry);

    if (index){
        Entries.push(pdnsList[index][value]);
        pdnsList.splice(index, 1);
    }

    var pdnsOb = {[value]:Entries}
    pdnsList.push(pdnsOb);
    localStorage.setItem("pdns", JSON.stringify(pdnsList));
}
function modifyLsIpInfo(value, ipInfoEntry){
    var ipInfoList = JSON.parse(localStorage.getItem("ipInfo"));
    var index = getArrayIndexByKey(value, ipInfoList);
    var Entries = [];
    Entries.push(ipInfoEntry);

    if (index){
        Entries.push(ipInfoList[index][value]);
        ipInfoList.splice(index, 1);
    }

    var ipInfoOb = {[value]:Entries}
    ipInfoList.push(ipInfoOb);
    localStorage.setItem("ipInfo", JSON.stringify(ipInfoList));
}



async function getCensys(value) {
    let infoEntry = {"source":"Censys","value":"-"};
    const options = {
        method: 'GET',
        // headers: new Headers({'content-type': 'application/json'}),
        headers: new Headers({'Authorization': 'Basic ' + btoa(censysKey + ":" + censysSec)}),
        mode: 'no-cors'
    };
    let res = await fetch(`https://censys.io/api/v1/view/ipv4/${value}`,options)
    .then(response => response.text())
    .then(xmlString => $.parseXML(xmlString))
    .then(data => console.log(data))

    infoEntry.type = determineType(infoEntry.value);
    return infoEntry;
}
async function Retry(call,value){

    call(value);
    if(condition){
        // run when condition is met
    }
    else {
        setTimeout(check, 1000); // check again in a second
    }
}
async function getRobtexIpInfo(value) {
    let ipInfoEntry = {"source":"RobtexIpInfo","value":"-"};

    let res = await $.get(`https://freeapi.robtex.com/ipquery/${value}`, function (data){
        ipInfoEntry.value = data;
    }).fail(function(data) {
        if (data.status == 429){
            console.log(data.status);
            // var result = await Retry('getRobtexIpInfo',value);
            // ipInfoEntry.value = result;
        };
   }).always(function() {
        console.log("completed");
   }).catch(error => {
       console.log(error)
   });
   return ipInfoEntry;
}
async function getRobtexPdns(value, type) {
    let pdnsEntry = {"source":"RobtexPdns","value":"-"};
    var direction;

    if (type == "ipv4-addr"){
        direction = "reverse";
    }
    else if (type == "domain-name"){
        direction = "forward";
    }
    else {
        console.log("No match for type in getRobtexPdns");
    }

    let res = await $.get(`https://freeapi.robtex.com/pdns/${direction}/${value}`, function (data){
        let string = ("[" + data.replace(/\r\n/g,",") + "]").replace(/,]/g,"]");
        pdnsEntry.value = JSON.parse(string);
    }).fail(function(data, textStatus, xhr) {
        if (data.status == 429){
            console.log(data['x-rt-time']);
            console.log(data.status);
        };
   }).always(function() {
        //TO-DO after fail/done request.
        console.log("completed");
   }).catch(error => {
       console.log(error)
   });
   return pdnsEntry;
}






async function submitObservable() {
    $('.obRow').show();

    if (!localStorage.getItem('bundle')) {
        createLsBundle();
    }
    if (!localStorage.getItem('info')) {
        createLsInfo();
    }
    if (!localStorage.getItem('pdns')) {
        createLsPdns();
    }
    if (!localStorage.getItem('ipInfo')) {
        createLsIpInfo();
    }
    let input = document.getElementById('inOb').value.split("\n");

    input.map(ob => doIt(ob));
    document.getElementById('inOb').value = '';
}
async function doIt(value) {

    setTimeout(function(){},1200);

    infoList = JSON.parse(localStorage.getItem('info'));
    const index = getArrayIndexByKey(value, infoList);
    if (!index && (value.length > 0)){
        var type = determineType(value);
        var id = createId(type);
        var bundOb = {"id":id, "source":"user", "type":type, "value":value};
        addToLsBundle(bundOb);

        let infoEntry = await getGoogleDns(value, type);
        modifyLsInfo(value, infoEntry);

        let pdnsEntry = await getRobtexPdns(value, type);
        modifyLsPdns(value, pdnsEntry);

        if (type != 'ipv4-addr'){
            addToPage(bundOb);
        }
        else {
            setTimeout(function(){},1200);
            let ipInfoEntry = await getRobtexIpInfo(value)
            modifyLsIpInfo(value, ipInfoEntry);
            addToPage(bundOb);
        }
    }
}

function makePrimary(id) {
    let value = document.getElementById(id).innerHTML;
    let type = determineType(value);

    changeDisplay(type);
    updateLinks(value, type);

    let prev = document.getElementById(id).parentNode.children;
    prev.forEach(function(p) {
        p.classList.replace('btn-primary', 'btn-secondary');
    });
    document.getElementById(id).classList.replace('btn-secondary', 'btn-primary');

    displayObTable(value);

    displayIntDnsTable(value);

    displayIpInfoTable(value);

    displayPdnsTable(value);

    displayPocTable(value);

}


function displayObTable(value) {
    $('#infoTable').bootstrapTable('destroy');
    // $('#outInfo').show()
    var infoList = JSON.parse(localStorage.getItem("info"));
    var index = getArrayIndexByKey(value, infoList);

    try {
        let data =infoList[index][value];

        $('#infoTable').bootstrapTable({
            data: data
        });
        $('#infoTable').bootstrapTable('load', data);
        $('#infoTable').bootstrapTable('hideLoading');
    }
    catch {
        // alert(`table couldn't be loaded`);
    }
}
function displayIntDnsTable(value){

    $('#intDnsTable').bootstrapTable('destroy');

    var fqdn = fqdnData.filter(obj => {
        return obj.Fqdn == value
    });
    fqdn = fqdn[0]

    if (fqdn) {
        $('#intDnsTable').bootstrapTable({
            data: fqdn
        });
        $('#intDnsTable').bootstrapTable('load', fqdn);
        $('#intDnsTable').bootstrapTable('hideLoading');
    }
    else {
        // alert(`table couldn't be loaded`);
    }
}
function displayIpInfoTable(value) {
    $('#whoisTable').bootstrapTable('destroy');

    var ipInfoList = JSON.parse(localStorage.getItem("ipInfo"));
    var index = getArrayIndexByKey(value, ipInfoList);

    try {
        var origData = ipInfoList[index][value][0].value;

        var data = [];
        data.push({key:"AS Name",value:origData.asdesc});
        data.push({key:"AS",value:origData.as});
        data.push({key:"City",value:origData.city});
        data.push({key:"Country",value:origData.country});
        data.push({key:"WHOIS Desc",value:origData.whoisdesc});
        data.push({key:"Route Desc",value:origData.routedesc});


        $('#whoisTable').bootstrapTable({
            data: data,
            columns: [{
                field: 'key',
                title: 'Key',
                class: 'font-weight-bold text-primary'
            }, {
                field: 'value',
                title: 'Value'
            }],
            showHeader: false
        })

        $('#whoisTable').bootstrapTable('load', data);
        $('#whoisTable').bootstrapTable('hideLoading');
    }
    catch {
        // alert(`table couldn't be loaded`);
    }
}
function displayPdnsTable(value) {
    $('#pdnsTable').bootstrapTable('destroy');

    var pdnsList = JSON.parse(localStorage.getItem("pdns"));
    var index = getArrayIndexByKey(value, pdnsList);

    try {
        var data = pdnsList[index][value][0].value;

        $('#pdnsTable').bootstrapTable({
            data: data
        });
        $('#pdnsTable').bootstrapTable('load', data);
        $('#pdnsTable').bootstrapTable('hideLoading');
    }
    catch {
        // alert(`table couldn't be loaded`);
    }
}
function displayPocTable(value){
    $('#pocDiv').show();
    $('#pocTable').bootstrapTable('destroy');

    var fqdn = fqdnData.filter(obj => {
        return obj.Fqdn == value
    });
    fqdn = fqdn[0]

    try {
        var origData = pocData.filter(obj => {
            return obj.Tag == fqdn.Tag
        });
        origData = origData[0]
    }
    catch{}

    if (origData) {
        var data = [];
        data.push({key:"Portfolio",value:origData.Portfolio});
        data.push({key:"System",value:origData.System});
        data.push({key:"Description",value:origData.MissionNeed});
        data.push({key:"Organization",value:origData.Organization});
        data.push({key:"Status",value:origData.Status});
        data.push({key:"Version",value:origData.Version});
        data.push({key:"PrimaryPOC",value:origData.PrimaryPOC});
        data.push({key:"ProductOwner",value:origData.ProductOwner});
        data.push({key:"IssmIsso",value:origData.IssmIsso});
        data.push({key:"IssmIssoAlternate",value:origData.IssmIssoAlternate});
        data.push({key:"ITPM",value:origData.ITPM});
        data.push({key:"BusinessOwner",value:origData.BusinessOwner});
        data.push({key:"Links",value:origData.Links});
        data.push({key:"DABAlternate",value:origData.DABAlternate});
        data.push({key:"DABPrimary",value:origData.DABPrimary});
        data.push({key:"ProjectTeamTechLead",value:origData.ProjectTeamTechLead});
        data.push({key:"QualityEngineers",value:origData.QualityEngineers});

        $('#pocTable').bootstrapTable({
            data: data,
            columns: [{
                field: 'key',
                title: 'Key',
                class: 'font-weight-bold text-primary'
            }, {
                field: 'value',
                title: 'Value'
            }],
            showHeader: false
        })

        $('#pocTable').bootstrapTable('load', data);
        $('#pocTable').bootstrapTable('hideLoading');
    }
    else {
        // alert(`table couldn't be loaded`);
    }
}


function searchCall() {
    // var term = document.getElementById('term').value;
    // var tok = localStorage.jwt_token;
    var url = `https://lcd.terra.dev/cosmos/auth/v1beta1/accounts/terra1nps9aq9h645fqylr0lsu0cz0uj0j3mudch5j64`;
    // var bod = `{"filters":[{"fieldId":"aTjz3oW3Vezt9","id":"","filterType":"contains","value":"${term}"}]}`;

    function redisplay() {
        var data = (this.responseText);
        $('#table2').bootstrapTable({
            data: data
        });
        $('#table2').bootstrapTable('load', data);
        $('#table2').bootstrapTable('hideLoading');
    }
    var request = new XMLHttpRequest();
    request.addEventListener("load", redisplay);
    request.open('GET', url, true);
    // request.setRequestHeader('Authorization', `Bearer ${tok}`);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // request.send(bod);
    request.send();
}


$(function() {
    clearAllObs();
    changePage('observables');
    changeDisplay('');
    $('#timelineTable').bootstrapTable({
        data: timelineData
    });
    $('#timelineTable2').bootstrapTable({
        data: timelineData2
    });
    $('#splunkTable').bootstrapTable({
        data: splunkLinks
    });
    $('.hidden').hide();
});

$(document).ready(function() {
    // Initialize the tooltip.
    $('#copy-button').tooltip();

    // When the copy button is clicked, select the value of the text box, attempt
    // to execute the copy command, and trigger event to update tooltip message
    // to indicate whether the text was successfully copied.
    $('#copy-button').bind('click', function() {
      var input = document.querySelector('#copy-input');
      input.setSelectionRange(0, input.value.length + 1);
      try {
        var success = document.execCommand('copy');
        if (success) {
          $('#copy-button').trigger('copied', ['Copied!']);
        } else {
          $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
        }
      } catch (err) {
        $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
      }
    });

    // Handler for updating the tooltip message.
    $('#copy-button').bind('copied', function(event, message) {
      $(this).attr('title', message)
          .tooltip('fixTitle')
          .tooltip('show')
          .attr('title', "Copy to Clipboard")
          .tooltip('fixTitle');
    });
});
