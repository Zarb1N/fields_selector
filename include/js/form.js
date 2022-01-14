var crops = {"0": "Нет данных", "1010101": "пшеница озимая", "1100101": "батат", "1100201": "морковь", "1100202": "пастернак", "1100203": "петрушка", "1100204": "редис", "1100205": "редька", "1100206": "репа", "1100207": "свекла столовая", "1100208": "сельдерей ", "1100209": "хрен (корнеплод)", "1100301": "брокколи", "1100302": "капуста брюсельская ", "1100303": "кольраби", "1100304": "капуста кочанная ", "1100305": "капуста пекинская ", "1100306": "капуста савойская ", "1100307": "капуста цветная ", "1100401": "лук многоярусный", "1100402": "лук репчатый", "1100403": "лук-батун", "1100404": "лук-порей", "1100405": "лук-шалот", "1100406": "чеснок", "1100501": "латук", "1100502": "шпинат", "1100503": "щавель", "1100601": "кориандр пряный", "1100602": "майоран", "1100603": "мелисса", "1100604": "мята перечная", "1100605": "укроп", "1100606": "фенхель пряный", "1100607": "хрен овощной", "1100608": "чабер", "1100701": "артишок", "1010102": "рожь", "1010103": "тритикале", "1010104": "озимый ячмень", "1010201": "гречиха", "1010202": "кукуруза", "1010203": "овес", "1010204": "просо", "1010205": "пшеница яровая", "1010206": "рис", "1010207": "сорго", "1010208": "чумиза на зерно", "1010209": "ячмень яровой", "1010210": "яровая рожь", "1020001": "бобы кормовые", "1020002": "горох", "1020003": "люпин", "1020004": "нут", "1020005": "соя", "1020006": "фасоль", "1020007": "чечевица", "1020008": "чина посевная", "1030101": "картофель", "1030102": "топинамбур/земляная груша", "1030201": "брюква", "1030202": "капуста кормовая", "1030203": "морковь кормовая", "1030204": "репа кормовая", "1030205": "свекла кормовая", "1030206": "свекла сахарная", "1030207": "турнепс", "1030208": "цикорий", "1040101": "арахис", "1040102": "горчица", "1040103": "клещевина", "1040104": "кунжут", "1040105": "лен-кудряш", "1040106": "подсолнечник", "1040107": "рапс озимый", "1040108": "рапс яровой", "1040109": "редька масличная", "1040110": "рыжик", "1040111": "сафлор", "1040112": "сурепица яровая (масличная)", "1040201": "анис", "1040202": "кориандр эфирно-масличный", "1040203": "лаванда ", "1040204": "мята эфирно-масличная", "1040205": "тмин", "1040206": "фенхель эфирно-масличный", "1040207": "шалфей мускатный", "1050001": "джут", "1050002": "канатник", "1050003": "кенаф", "1050004": "конопля", "1050005": "лен-долгунец", "1050006": "хлопчатник", "1060101": "могар", "1060102": "райграс однолетний", "1060103": "суданская трава", "1060104": "чумиза на корм", "1060201": "вика ", "1060202": "клевер (однолетние виды)", "1060203": "люпин на корм", "1060204": "пелюшка", "1060205": "сераделла", "1060301": "бекмания обыкновенная", "1060302": "ежа", "1060303": "житняк", "1060304": "кострец", "1060305": "овсянница луговая", "1060306": "пырей", "1060307": "райграс многолетний", "1060308": "тимофеевка", "1060401": "донник", "1060402": "клевер", "1060403": "козлятник (галега восточная)", "1060404": "люцерна", "1060405": "лядвенец", "1060406": "эспарцет", "1070001": "арбуз", "1070002": "дыня", "1070003": "кабачок", "1070004": "тыква", "1080001": "махорка", "1080002": "табак", "1090001": "анабазис", "1090002": "валериана", "1090003": "мак", "1090004": "ромашка далматская", "1090005": "хмель", "1100702": "ревень", "1100703": "спаржа", "1100801": "арбуз овощной", "1100802": "дыня овощная", "1100803": "кабачок овощной", "1100804": "огурец", "1100805": "патиссон", "1100806": "тыква овощная", "1100901": "баклажаан", "1100902": "перец", "1100903": "томат", "1101001": "боб садовый", "1101002": "горох овощной", "1101003": "фасоль овощная", "1110101": "айва", "1110102": "груша", "1110103": "ирга", "1110104": "мушмула кавказская", "1110105": "рябина арония", "1110106": "хеномелес", "1110107": "яблоня", "1110201": "абрикос", "1110202": "алыча", "1110203": "вишня", "1110204": "персик", "1110205": "слива", "1110206": "терн", "1110207": "черешня", "1110301": "брусника", "1110302": "ежевика", "1110303": "жимолость", "1110304": "земляника", "1110305": "калина", "1110306": "крыжовник", "1110307": "малина", "1110308": "облепихаа", "1110309": "смородина", "1110310": "черника", "1110401": "бук", "1110402": "каштан", "1110403": "кедровые сосны", "1110404": "лещина", "1110405": "миндаль", "1110406": "орех грецкий", "1110407": "фисташка", "1110408": "фундук", "1110501": "апельсин", "1110502": "грейпфрут", "1110503": "лайм", "1110504": "лимон", "1110505": "мандарин", "1110601": "гранат", "1110602": "инжир", "1110603": "кизил", "1110604": "лавровишня", "1110605": "фейхоа", "1110606": "хурма", "1110607": "чай", "1110608": "шелковица", "1110701": "виноград культурный", "1120101": "кукуруза на силос", "1120102": "кукуруза+зерносмесь", "1120103": "кукуруза+подсолнечник", "1120104": "подсолнечник+зерносмесь", "1120105": "зерносмесь (злаковые+ бобовые культуры) ", "1130001": "пар занятый", "1130002": "пар черный"};

function createForm(pid,f){
    var content = document.getElementById("fields");
    var form = document.createElement('div');
    form.id = pid;
    var container_id = "tumb_"+pid;
    var sdate_id = "sdate_"+pid;
    var edate_id = "edate_"+pid;
    var crop_id = "crop_"+pid;
    var area_id = "area_"+pid;
    var parea_id = "parea_"+pid;
    var uid_id = "uid_"+pid;
    try{
        var crop_code = f.properties.crop.code;
    } catch {
        var crop_code = "0";
    }
    
    var btnclc = "$('#"+pid+"').remove()";
    //var rounded_area = 1234;
    //var img = getTumb();
    form.classList.add("pannel");
    form.innerHTML = //"<div class='formhedaer'><h2>Поле: "+String(pid)+"</h2></div>"+ 
                        //"<hr>" +
                        "<div class='formhedaer'><hr><h2>Информация о поле</h2></div>"+
                            //map
                            "<div class='tumbnail' id='"+container_id+"'>"+
                            "</div>" +
                            //"<div class='control'>"+
                            //id
                            "<div class='uid_input'>"+
                            "<label for='"+uid_id+"'>Номер поля:</label>"+
                            "<input type='text' class='form-control' id='"+uid_id+"' name='"+uid_id+"' value="+pid+">"+//"<br>" +
                            "</div>" +
                            //culture
                            "<div class='culture_input'>"+
                            "<label for='"+crop_id+"'>Культура:</label>"+
                            "<select class='form-control' id='"+crop_id+"' name='"+crop_id+"' >"+
                                get_croplist()+
                            "</select>"+//"</br>"+
                            "</div>"+
                            //area fact
                            "<div class='parea_input'>"+
                            "<label for='"+parea_id+"'>Площадь фактическая Га:</label>"+
                            "<input type='number' class='form-control' id='"+parea_id+"' name='"+parea_id+"' value="+f.properties.area+" disabled>"+//"<br>" +
                            "</div>" +
                            //area doc
                            "<div class='area_input'>"+
                            "<label for='"+area_id+"'>Площадь по документам Га:</label>"+
                            "<input type='number' class='form-control' id='"+area_id+"' name='"+area_id+"' value="+f.properties.crop_area+">"+//"<br>" +
                            "</div>" +
                            //sow start
                            "<div class='sdate_input'>"+
                            "<label for='"+sdate_id+"'>Дата начала сева:</label>"+
                            "<input type='date' class='form-control mydatetimepicker' id="+sdate_id+" required pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required>"+
                            "</div>"+
                            //sow end
                            "<div class='edate_input'>"+
                            "<label for='"+edate_id+"'>Дата окончания сева:</label>"+
                            "<input type='date' class='form-control mydatetimepicker' id="+edate_id+" required pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required>"+
                            "<span class='validity'></span>"+
                            "</div>" +
                            //"<br>"+
                            "<div class='btn_input'>"+
                            //"<button class='btn btn-primary float-right' type='button' name='rmbutton' onclick='$('#"+pid+"').remove()'>Удалить</button>"+
                            "<button class='btn btn-primary float-right' type='button' name='rmbutton' onclick=rmpanel('"+pid+"')>Удалить</button>"+
                            "</div>"+
                        "</div>";
    content.appendChild(form);
    getThumb(container_id,f);
    document.getElementById(crop_id).value=crop_code;
    //fillForm(pid,f);
};

function fillForm(pid,f){
    var date_id = "sowdate_"+pid;
    var crop_id = "crop_"+pid;
    var area_id = "area_"+pid;
    $(crop_id).val(f.properties.crop.code);
    $(area_id).val(f.properties.crop_area);
    $(uid_id).val(pid);
};

function get_croplist(){
    var crops_content = "";
    const keys = Object.keys(crops);
    for (let i = 0; i < keys.length; i++) {
        crops_content+="<option value="+keys[i]+">"+crops[keys[i]]+"</option>";
    }
    return crops_content;
};

function rmpanel(id){
    document.getElementById(id).remove();
    /*
    var data = draw.getAll();
    draw.deleteAll();
    if (data.features.length>0){
        for(i=0;i<data.features.length;i++){
            if(data.features[i].properties.id!=id){
                draw.add(data.features[i]);
            }
        };
    };
    */
    for(i=0;i<cosmetic_geojson.features.length;i++){
        if(cosmetic_geojson.features[i].properties.id==id){
            cosmetic_geojson.features.splice(i,1);
        }
    }
    map.getSource('cosmetic').setData(cosmetic_geojson);
    map.moveLayer('cosmetic');
    updateArea();
}

function updatemeta(){
    for(i=0;i<cosmetic_geojson.features.length;i++){
        var pid = cosmetic_geojson.features[i].properties.id;
        var sdate_id = "sdate_"+pid;
        var edate_id = "edate_"+pid;
        var crop_id = "crop_"+pid;
        var area_id = "area_"+pid;
        var parea_id = "parea_"+pid;
        if(cosmetic_geojson.features[i].properties.hasOwnProperty('crop')==false)
            cosmetic_geojson.features[i].properties.crop = {};
        cosmetic_geojson.features[i].properties.crop.code = document.getElementById(crop_id).value*1;
        cosmetic_geojson.features[i].properties.area = document.getElementById(area_id).value*1;
        cosmetic_geojson.features[i].properties.sdate = document.getElementById(sdate_id).value;
        cosmetic_geojson.features[i].properties.edate = document.getElementById(edate_id).value;
    }
    map.getSource('cosmetic').setData(cosmetic_geojson);
    map.moveLayer('cosmetic');
    updateArea();
}

function sendresult(){
    var result = {};
    result.uname = document.getElementById("uname").value;
    result.uarea = document.getElementById("uarea").value*1;
    result.ureg = document.getElementById("ureg").value;
    result.emer_type = document.getElementById("emer_type").value*1;
    result.emer_date = document.getElementById("emer_date").value;
    result.geojson = cosmetic_geojson;
    alert("Заявка отправлена\n"+JSON.stringify(result));
    console.log(JSON.stringify(result));
}