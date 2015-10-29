referstr="";referorg="";fav1="";str36="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";m=[];lc=[];
lcbase=location.search;
if(!lcbase || lcbase.length<8)lcbase="?vM11B00";
for (i=0;i<=7;i++) {
	lc[i]=lcbase.charAt(i);
	if (i>=2) lc[i]= parseInt(lc[i],36);
}
if (lc[1]=="r") {
	rpos = lcbase.indexOf("_");
	if (rpos>=0) {
		referorg = lcbase.substring(rpos+1);
		for (ri=0; ri<referorg.length; ri+=4) {
			refcrd = parseInt(referorg.substring(ri,ri+4), 16);
			referstr += String.fromCharCode(refcrd);
		}
	}
}
mt = new Object();
if (lc[7]==0) 	mt=actbl;
else			mt=cstbl[lc[7]];
var tagid = 0;
for (tag in mt) mt[tag].tagid = tagid++;


if(document.cookie){
	fav1_s = document.cookie.indexOf("fav1=");
	if(fav1_s >= 0){
		fav1_e = document.cookie.indexOf("//",fav1_s);
		fav1=document.cookie.substring(fav1_s+5,fav1_e);
	}
}

function fav_click(tag){
	tmp=""+tag;
	while(tmp.length<8)tmp+=" ";
	if (( pos = fav1.indexOf(tmp) ) < 0) fav1 = tmp+fav1;
	else fav1 = fav1.substring(0,pos) + fav1.substring(pos+8);
	document.cookie = "fav1="+fav1+"//; expires=Thu, 1-Jan-2030 00:00:00 GMT";
}

function fav_cbox(tag){
	tmp=""+tag;
	while(tmp.length<8)tmp+=" ";
	is_chk = (fav1.indexOf(tmp)>=0) ? " checked" : "";
	return "<input type=checkbox class=cb onClick='fav_click(\""+tag+"\")'"+is_chk+">";
}

function fav_clear(){
	if (confirm("FAVORITE èÓïÒÇè¡ãéÇµÇ‹Ç∑Ç©ÅH")) {
		document.cookie = "fav1=//; expires=Sat, 1-Jan-2000 00:00:00 GMT";
		location.reload();
	}
}

function get_level(tag, type, num)
{
	if (lc[7]>0 && (lc[3]&8) && (2<=type && type<=4 || 7<=type && type<=9)) {
		if (mt[tag][type*2+num] && actbl[tag] && actbl[tag][type*2+num]) return actbl[tag][type*2+num];
	}
	return mt[tag][type*2+num];
}

function replace_title(title, tag)
{
/*
	nowd=new Date();
	lockd=new Date(2015,3,1,23,0,0);
	if (nowd<lockd) {
		artist = titletbl[tag][ARTISTINDEX];
		len = title.length;
		tagstart = title.indexOf(">");
		if (tagstart >= 0) {
			len = title.indexOf("</") - tagstart - 1;
		}

		if (title.indexOf("ç’") >= 0) {}
		else if (len==1){title=artist+" -"+title+"- FESTIVAL";}
		else if (artist.indexOf("-MITSURU-") >= 0) {title+=" -ñû- FESTIVAL";}
		else if (artist.indexOf("-AYAKA-") >= 0) {title+=" -ñû- FESTIVAL";}
		else if (artist.indexOf("çïîL") >= 0) {title+="Ç∆FUJIMORIÇ∆ç’";}
		else if (title.indexOf("çﬂÇ∆î±") >= 0) {title+="Ç∆ç’";}
		else if (title.indexOf("CaptivAte") >= 0) {title+="FESTIVAL";}
		else if (tag.indexOf("chrono") >= 0) {title+=" FESTIVAL";}
		else if (title.indexOf("âΩÉ}ÉjÉA") >= 0) {title="ÉIÉåÇÕFUJIMORIÉ}ÉcÉäÅIÇ®ëOÇÕâΩÉ}ÉcÉäÅH";}
		else if (title.indexOf("Ç§ÇÁÇµÇ‹") >= 0) {title="Ç’ÇÎÇÆÇÍÇ¡ÇµÇ‘ç’è≠èó!Ç”Ç∂Ç‡ÇËÇªÇΩéqÇøÇ·ÇÒ!";}
		else if (title.indexOf("Zenius") >= 0) {title=title.replace("-I-","-ç’-");}
		else if (title.indexOf("BRIDAL") >= 0) {title=title.replace("FESTIVAL","-ç’- FESTIVAL");}
		else if (title.indexOf("smooooch") >= 0) {title=title.replace("ÅEÅÕÅE"," -ÅEÅÕÅE- FESTIVAL");}
		else if (title.indexOf("m1dy") >= 0) {title=title.replace("m1dy","m1dy -ç’-");}
		else if (title.indexOf("ñqê_") >= 0) {title=title.replace("ìJ","é¬ìJ");}
		else if (title.indexOf("ñÏãÖ") >= 0) {title=title.replace("ñÏãÖ","ç’");}
		else if (title.indexOf("çréR") >= 0) {title=title.replace("çréRâ€í∑","êºë∫ïîí∑");}
		else if (title.indexOf("Ç®ïƒ") >= 0) {title=title.replace(/Ç®ïƒ/g,"Ç®ç’");}
		else if (title.indexOf("í¥ê¬è≠îN") >= 0) {title=title.replace(/í¥/g,"ç’");}
		else if (tag=="ganymede") {title+=" -ç’- FESTIVAL";}
		else if (tag=="allwreck") {title+=" -ç’- FESTIVAL";}
		else if (title.toLowerCase().lastIndexOf("d")==title.length-1) {title="ç°âΩìxÅH"+title;}
		else if (title.toLowerCase().lastIndexOf("de")==title.length-2) {title="ç°âΩìxÅH"+title;}
		else if (title.lastIndexOf("Do")==title.length-2) {title="ç°âΩìxÅH"+title;}
		else if (title.toLowerCase().indexOf("d</") >= 0) {title=title.replace(">",">ç°âΩìxÅH");}
		else if (title.indexOf("de</") >= 0) {title=title.replace(">",">ç°âΩìxÅH");}
		else if (title.indexOf("Close the World") >= 0) {title=title.replace(">",">ç°âΩìxÅH");}
		else if (tag=="grafull") {title="ç°âΩìxÅH"+title;}
		else if (tag=="gobeyond") {title="ç°âΩìxÅH"+title;}
		else if (tag=="surgames") {title+=" -ZEUS Mix-";}
		else if (tag=="_schrcat") {title=title.replace("îL","ç’");}
		else if (tag=="cleopatr") {title=title.replace(">",">ÉRÉåÅAÇ»ÇﬂÇƒ");}
		else if (tag=="cinder") {title=title.replace("</"," -ãñ- FESTIVAL</");}
		else if (tag=="_nagisa") {title=title.replace("ÉâÉîÉä","É}ÉcÉä");}
		else if (title.indexOf("</") >= 0) {title=title.replace("</"," -ç’- FESTIVAL</");}
		else title+=" -ç’- FESTIVAL";
	}
*/
	return title.bold();
}

function get_tdata(tag,cnt)
{
	title = titletbl[tag][TITLEINDEX];
	subtitle = titletbl[tag][SUBTITLEINDEX];

	title = replace_title(title, tag);

	if (subtitle) title += subtitle;
	if (mt[tag][23]) title += mt[tag][23].italics();
//	title = "\""+tag + "\" " +title;

	ttnum = mt[tag][0];
	vers  = titletbl[tag][VERINDEX];
	opts  = titletbl[tag][OPTINDEX];
	if (lc[7]==0) {
		if (ttnum==1 && (vers==22||vers==23))	ttnum=0;
	} else {
		title = title.replace(/COLOR=/gi,"ALT=");
		if (ttnum==1 && lc[7]>=3 && vers==lc[7])	ttnum=0;
		ttnum = "c"+ttnum;
	}
	intro = (!(opts&1)) ? "Å†"
			:"<a href='../iidx/"+vers+".html#"+tag+"'>Å°<\/a>";

	if      ((opts&6)==6) ttnum+="c";
	else if (opts&2) ttnum+="a";
	else if (opts&4) ttnum+="b";

	return "<td>"+intro+"<\/td><td class=tt"+ttnum+" title="+cnt+">"+title+
			"<\/td><td>"+fav_cbox(tag)+"<\/td>";
}

vertbl2=["CS","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th",
		"RED","SKY","DD","GOLD","DJT","EMP","SIR","RA","LC","tri","SPA","PEN","cop"];
vertbl2[28]="sub";
function get_vdata(tag)
{
	return "<td class=tt align=right>["+vertbl2[titletbl[tag][VERINDEX]]+"]<\/td>";
}

function get_clink(str, lcpos, val, val2)
{
	lcp=[];
	for(ii=0; ii<=7; ii++) lcp[ii]=lc[ii];
	switch (lcpos) {
		case 1: lcp[1]=val; lcp[2]=val2; break;
		case 4: if (val2==0) lcp[4]=val+Math.floor(lcp[4]/4)*4;
				else		 lcp[4]=(lcp[4]&(31-val2))+val;
				break;
		case 3: if (val2==0) lcp[3]=(lcp[3]&8)+val;
				else		 lcp[3]=(lcp[3]&7)+val;
				break;
		case 7:
		case 5:
		case 6: lcp[lcpos]=val; break;
	}
	ret = "<a href='";
	isbold = 1;
	for(ii=0; ii<=7; ii++) {
		if (lcp[ii]!=lc[ii]) isbold = 0;
		ret+= (ii>=2 ? str36.charAt(lcp[ii]) : lcp[ii]);
	}
	if (lcpos==4 && val2!=0 && (lc[4]&val2)) str = str.fontcolor("red");
	else if (lcpos==3 && val2!=0 && (lc[3]&val2)) str = str.fontcolor("red");
	else if (isbold) str = str.fontcolor("red");
	return ret+(lcp[1]=="r" ? "_"+referorg:"")+"'>"+str+"<\/a>";
}

function get_clink2(str, lcpos, val, val2, cols)
{
	return "<td align=center colspan="+cols+">"+
			get_clink(str, lcpos, val, val2)+"<\/td>";
}

captbl=["SBo","SB","SN","SH","SA","SX","DB","DN","DH","DA","DX",""];
csstbl=[ "vb","vb","vn","vh","va","vx","vb","vn","vh","va","vx","tt"];
function get_cdata(type, width)
{
	str="";
	if (lc[1]=="e") {
		str="<th width="+width+" class=c"+csstbl[type]+">"+captbl[type]+"<\/th>";
	
	} else {
		str="<th width="+width+" class=c"+csstbl[type]+">"+captbl[type]+"<br>"+
			(lc[5]==type    ? get_clink("Å£",5,type,   0):get_clink("Å¢",5,type,   0))+" "+
			(lc[5]==type+12 ? get_clink("Å•",5,type+12,0):get_clink("Å§",5,type+12,0))+
			"<\/th>";
	}
	return str;
}
function get_cdata2(type, width, clas, cname)
{
	str="";
	if ((lc[1]=="s" || lc[1]=="d")&&lc[2]==0 || lc[1]=="p") {
		str= "<th width="+width+" class="+clas+">"+(clas=="xxx" ? "":cname) +"<\/th>";


	} else {
		str="<th width="+width+" class="+clas+">"+cname+"<br>"+
		(lc[6]==type   ? get_clink("Å£",6,type,  0):get_clink("Å¢",6,type,  0))+" "+
		(lc[6]==type+3 ? get_clink("Å•",6,type+3,0):get_clink("Å§",6,type+3,0))+"<\/th>";
	}
	return str;
}

/* 0=Sb, 1=SB, ... 6=DB, ... */
linktbl=["B", "R", "N", "H", "A", "X", "B", "N", "H", "A", "X" ];
giftbl =["b", "b", "n", "h", "a", "x", "b", "n", "h", "a", "x" ];
function get_sdata(tag, type)
{
	vers = titletbl[tag][VERINDEX];
	if (vers==28) vers="s";
	if (lc[7]!=0 && type==1 && get_level(tag, type, 1)==0) type--;
	opt  = get_level(tag, type, 2);

	twel = opt&2;	// åˆéÆ12íiäKÇ≈Ç†ÇÈ
	acin = opt&4;	// ACÇ…é˚ò^Ç≥ÇÍÇƒÇÈ
	iscn = "";
	if (type<2) {
	//	if (opt&2 && opt&8) iscn = " style='border: 1px green dashed;padding:0px'";
	} else if (opt&8) {
		iscn = " style='border: 1px gray solid;padding:0px'";	// CNorBSS
	}

	if (lc[7]!=0 && opt==0) {
		twel = 2;
		acin = 4;
	}

	lv   = get_level(tag, type, 1);
	gif  = twel ? giftbl[type] : "o";
	lvstr="";
	if (!(lc[3]&8) && 5<=lc[7] && lc[7]<=9 && lv==8)	{
		gif+="7p";
		if (!twel) lv = 0;
		lvstr = "D";
	} else if (!(lc[3]&8) && lc[7]==11 && lv==9)		{
		gif+="8p";
		if (!twel) lv = 0;
		lvstr = "E";
	} else {
		gif+=lv;
		if (!twel) lv = 0;
		lvstr = str36.charAt(lv);
	}
	anker= "";
	scropt = lc[4]&8 ? 1:0;
	opttab = [6,0,2,4];
	scropt+=opttab[lc[4]%4];
	lvstr += scropt+"0";
	linkchr = lc[4]&16 ? linktbl[type].toLowerCase() : linktbl[type];
	
	if (opt&1) {	// ïàñ ÉfÅ[É^Ç™Ç†ÇÈ
		if (type<6) {
			sdchr = (lc[4]&4) ? "B" : "1";
			rnstr = (lc[4]&4) ? "R0765432101234567" : "";
			anker =" <a href='"+vers+"/"+tag+".html?"+sdchr+linkchr+
					lvstr+rnstr+"'>1P<\/a>/";
			sdchr = (lc[4]&4) ? "B" : "2";
			rnstr = (lc[4]&4) ? "R0123456707654321" : "";
			anker+="<a href='"+vers+"/"+tag+".html?"+sdchr+linkchr+
					lvstr+rnstr+"'>2P<\/a>";
		} else {
			sdchr = (lc[4]&4) ? "M" : "D";
			anker =" <a href='"+vers+"/"+tag+".html?"+sdchr+linkchr+
					lvstr+"'>DP<\/a>";
		}
	}
	notac = "";
	if (lc[7]==0&&(mt[tag][0]!=1 || get_level(tag, type, 1) && !acin)) notac = "x";

	return "<td class="+notac+csstbl[type]+iscn+"><img src='lv/"+gif+".gif'>"+anker+"<\/td>";
}


function get_sdata_party(tag, opt, lv)
{
	vers = titletbl[tag][VERINDEX];
	if (vers==28) vers="s";
	iscn="";
	if (lv>=4){
		lv%=4;
		iscn = " style='border: 1px gray solid;padding:0px'";	// CNorBSS
	}
	gif = "b"+lv;
	anker= "";
	scropt = lc[4]&8 ? 1:0;
	opttab = [6,0,2,4];
	scropt+=opttab[lc[4]%4];
	lvstr = ""+lv+scropt+"0";
	linkchr = lc[4]&16 ? "p" : "P";
	
	if (opt) {	// ïàñ ÉfÅ[É^Ç™Ç†ÇÈ
		sdchr = (lc[4]&4) ? "B" : "1";
		rnstr = (lc[4]&4) ? "R0765432101234567" : "";
		anker =" <a href='"+vers+"/"+tag+".html?"+sdchr+linkchr+
					lvstr+rnstr+"'>1P<\/a>/";
		sdchr = (lc[4]&4) ? "B" : "2";
		rnstr = (lc[4]&4) ? "R0123456707654321" : "";
		anker+="<a href='"+vers+"/"+tag+".html?"+sdchr+linkchr+
					lvstr+rnstr+"'>2P<\/a>";
	}

	return "<td class=vb"+iscn+"><img src='lv/"+gif+".gif'>"+anker+"<\/td>";
}

cschr = ["","","U","3","4","5","6","7","8","9","10","R","H","D","G","T","E","B"];
function create_cslink(csver)
{
	ret = "?a0";
	for(ii=3; ii<=6; ii++) ret+= str36.charAt(lc[ii]);
	ret+= str36.charAt(csver);
	return "<th width=20><a href='"+ret+"'>"+cschr[csver]+"<\/a><\/th>";
}
function create_aclink(ret1, ret2, strr)
{
	ret = ret1;
	for(ii=4; ii<=6; ii++) ret+= str36.charAt(lc[ii]);
	ret+= ret2;
	return "<td colspan=2 align=center><a href='"+ret+"'>"+strr+"<\/a><\/td>";
}

function check_csin(tag)
{
	ret="";
	for (csin=2; csin<=17; csin++) {
		iscs = (cstbl[csin][tag] == undefined) ? "" : "Åú";
		clcs = (csin%2==0) ? "vb" : "vn";
		if (lc[7]==0 && mt[tag][0]!=1) clcs="x"+clcs;
		ret+="<td align=center class="+clcs+">"+iscs+"<\/td>";
	}
	return ret;
}

function get_flash(tag)
{
	str='["';
	str+=str36.charAt(titletbl[tag][VERINDEX]);
	str+=mt[tag][0]+"00";
	str+=str36.charAt(mt[tag][ 5])+str36.charAt(mt[tag][ 7])+str36.charAt(mt[tag][ 9]);
	str+=str36.charAt(mt[tag][15])+str36.charAt(mt[tag][17])+str36.charAt(mt[tag][19]);
	str+=tag+'","'+titletbl[tag][GENREINDEX]+'","'+titletbl[tag][ARTISTINDEX];
	str+='","'+titletbl[tag][TITLEINDEX]+'","';
	if (titletbl[tag][SUBTITLEINDEX]) str+=titletbl[tag][SUBTITLEINDEX];
	str+='",,,,,,],<br>';
	return str;
}

function create_table1(ctgr_name)
{
	str="";
	captbl[11]=ctgr_name;
	ptn = (lc[1]=="e") ? 0 : (lc[3]&7);
	if (lc[7]!=0 && lc[1]!="e" && (lc[3]&7)!=5) {
		if (lc[7]>=15)	ptn=6;
		else			ptn=0;
	}
	//ptn=-1;

	switch(ptn) {
		case -1:
		for (mi=0; mi<m.length; mi++) str+=get_flash(m[mi]);
		break;
		case 0:
		case 1:
		str="<table><tr>"+get_cdata( 4, 60)+get_cdata( 3, 60)+get_cdata( 2, 60)+
			"<th><\/th>"+get_cdata(11,285)+"<th><\/th>"+get_cdata( 1, 60)+
			get_cdata( 7, 40)+get_cdata( 8, 40)+get_cdata( 9, 40)+"<\/tr>";
		for (mi=0; mi<m.length; mi++) {
			str+="<tr>"+get_sdata(m[mi], 4)+get_sdata(m[mi], 3)+get_sdata(m[mi], 2)+
				get_tdata(m[mi],mi+1)+get_sdata(m[mi], 1)+
				get_sdata(m[mi], 7)+get_sdata(m[mi], 8)+get_sdata(m[mi], 9)+"<\/tr>";
			if (10000>str.length)continue;document.write(str);str="";
		}
		break;
		case 2:
		str="<table><tr>"+get_cdata( 5, 60)+get_cdata( 4, 60)+get_cdata( 3, 60)+
			get_cdata( 2, 60)+get_cdata( 1, 60)+get_cdata( 0, 60)+
			"<th><\/th>"+get_cdata(11,285)+"<th><\/th><\/tr>";
		for (mi=0; mi<m.length; mi++) {
			str+="<tr>"+get_sdata(m[mi], 5)+get_sdata(m[mi], 4)+get_sdata(m[mi], 3)+
				get_sdata(m[mi], 2)+get_sdata(m[mi], 1)+get_sdata(m[mi], 0)+
				get_tdata(m[mi],mi+1)+"<\/tr>";
			if (10000>str.length)continue;document.write(str);str="";
		}
		break;
		case 3:
		str="<table><tr><th><\/th>"+get_cdata(11,285)+"<th><\/th>"+
			get_cdata( 6, 40)+get_cdata( 7, 40)+
			get_cdata( 8, 40)+get_cdata( 9, 40)+get_cdata(10, 40)+"<\/tr>";
		for (mi=0; mi<m.length; mi++) {
			str+="<tr>"+get_tdata(m[mi],mi+1)+get_sdata(m[mi], 6)+get_sdata(m[mi], 7)+
				get_sdata(m[mi], 8)+get_sdata(m[mi], 9)+get_sdata(m[mi],10)+"<\/tr>";
			if (10000>str.length)continue;document.write(str);str="";
		}
		break;
		case 4:
		str="<table><tr>"+get_cdata( 5, 60)+get_cdata( 4, 60)+get_cdata( 3, 60)+
			get_cdata( 2, 60)+get_cdata( 1, 60)+get_cdata( 0, 60)+"<th><\/th>"+
			get_cdata(11,285)+"<th><\/th>"+get_cdata( 6, 40)+get_cdata( 7, 40)+
			get_cdata( 8, 40)+get_cdata( 9, 40)+get_cdata(10, 40)+"<\/tr>";
		for (mi=0; mi<m.length; mi++) {
			str+="<tr>"+get_sdata(m[mi], 5)+get_sdata(m[mi], 4)+get_sdata(m[mi], 3)+
				get_sdata(m[mi], 2)+get_sdata(m[mi], 1)+get_sdata(m[mi], 0)+
				get_tdata(m[mi],mi+1)+get_sdata(m[mi], 6)+get_sdata(m[mi], 7)+
				get_sdata(m[mi], 8)+get_sdata(m[mi], 9)+get_sdata(m[mi],10)+"<\/tr>";
			if (10000>str.length)continue;document.write(str);str="";
		}
		break;
		case 5:
		str="<table><tr>";
		for (csi=2; csi<=17; csi++) str+=create_cslink(csi);
		str+="<th><\/th>"+get_cdata2(0,285, "ctt", ctgr_name)+"<th><\/th>"+
		get_cdata2(1, 45, "xxx", "Ver.")+"<\/tr>";
		for (mi=0; mi<m.length; mi++) {
			str+="<tr>"+check_csin(m[mi])+get_tdata(m[mi],mi+1)+
				get_vdata(m[mi])+"<\/tr>";
			if (10000>str.length)continue;document.write(str);str="";
		}
		break;
		case 6:
		str="<table><tr>"+get_cdata( 5, 60)+get_cdata( 4, 60)+get_cdata( 3, 60)+
			get_cdata( 2, 60)+"<th><\/th>"+
			get_cdata(11,285)+"<th><\/th>"+get_cdata( 1, 60)+get_cdata( 7, 40)+
			get_cdata( 8, 40)+get_cdata( 9, 40)+get_cdata(10, 40)+"<\/tr>";
		for (mi=0; mi<m.length; mi++) {
			str+="<tr>"+get_sdata(m[mi], 5)+get_sdata(m[mi], 4)+get_sdata(m[mi], 3)+
				get_sdata(m[mi], 2)+
				get_tdata(m[mi],mi+1)+get_sdata(m[mi], 1)+get_sdata(m[mi], 7)+
				get_sdata(m[mi], 8)+get_sdata(m[mi], 9)+get_sdata(m[mi],10)+"<\/tr>";
			if (10000>str.length)continue;document.write(str);str="";
		}
		break;
	}
	document.write(str+"<\/table>");
}

function create_table2(ctgr_name)
{
	str="<table><tr>"+get_cdata2(1, 45, "xxx", "Ver.")+
		get_cdata2(2, 60, "xxx", "N/H/A")+"<th><\/th>"+
		get_cdata2(0,285, "ctt", ctgr_name)+"<th><\/th><\/tr>";

	for (mi=0; mi<m.length; mi++) {
		str+="<tr>"+get_vdata(m[mi][0])+get_sdata(m[mi][0], m[mi][1])+
			get_tdata(m[mi][0], mi+1)+"<\/tr>";
		if (5000>str.length)continue;
		document.write(str);
		str="";
	}
	document.write(str+"<\/table>");
}

function create_table_party(ctgr_name)
{
	str="<table><tr>"+get_cdata2(1, 45, "xxx", "Ver.")+
		get_cdata2(2, 60, "xxx", "N/H/A")+"<th><\/th>"+
		get_cdata2(0,285, "ctt", ctgr_name)+"<th><\/th><\/tr>";

	for (mi=0; mi<m.length; mi++) {
		str+="<tr>"+get_vdata(m[mi][0])+
			(m[mi][2] ? get_sdata_party(m[mi][0], m[mi][1], m[mi][2])
			 : get_sdata(m[mi][0], m[mi][1]))+get_tdata(m[mi][0], mi+1)+"<\/tr>";
		if (5000>str.length)continue;
		document.write(str);
		str="";
	}
	document.write(str+"<\/table>");
}

function lvsort_sub(tag, type)
{
	lv = get_level(tag, type, 1);
	if (lv==0) {
		if      (type==2||type==4) lv = get_level(tag, 3 ,1);
		else if (type==7||type==9) lv = get_level(tag, 8 ,1);
		else if (type==1&&lc[7]!=0)lv = get_level(tag, 0 ,1);
	}
	return lv;
}
function lvsort(tag1, tag2)
{
	lv1 = lvsort_sub(tag1, lc[5]%12);
	lv2 = lvsort_sub(tag2, lc[5]%12);
	if (lv1 == lv2) return (mt[tag1].tagid - mt[tag2].tagid);
	return (lv1-lv2) * (lc[5]>12 ? -1 :1);
}

function versort(arr1, arr2)
{
	ver1 = titletbl[arr1[0]][VERINDEX];
	if (ver1==28) ver1=1.5;
	ver2 = titletbl[arr2[0]][VERINDEX];
	if (ver2==28) ver2=1.5;
	if (ver1 == ver2) return (mt[arr1[0]].tagid - mt[arr2[0]].tagid);
	return (ver1-ver2) * (lc[6]>2 ? -1 :1);
}

function versort0(tag1, tag2)
{
	ver1 = titletbl[tag1][VERINDEX];
	if (ver1==28) ver1=1.5;
	ver2 = titletbl[tag2][VERINDEX];
	if (ver2==28) ver2=1.5;
	if (ver1 == ver2) return (mt[tag1].tagid - mt[tag2].tagid);
	return (ver1-ver2) * (lc[6]>2 ? -1 :1);
}

function lvsort_bgn(arr1, arr2)
{
	lv1 = mt[arr1[0]][3];
	lv2 = mt[arr2[0]][3];
	if (lv1 == lv2) return (mt[arr1[0]].tagid - mt[arr2[0]].tagid);
	return (lv1-lv2) * (lc[6]>2 ? -1 :1);
}

function sepsort1(tag1, tag2)
{
	new1 = (mt[tag1][0]==2||mt[tag1][0]==4||(lc[7]>=3 && titletbl[tag1][VERINDEX]==lc[7]));
	new2 = (mt[tag2][0]==2||mt[tag2][0]==4||(lc[7]>=3 && titletbl[tag2][VERINDEX]==lc[7]));
	if (new1 == new2) return (mt[tag1].tagid - mt[tag2].tagid);
	return new2 - new1;
}

function sepsort2_sub(tag)
{
	if (lc[7]>=3 && titletbl[tag][VERINDEX]==lc[7] && mt[tag][0]==1) return 0;
	else if (mt[tag][0]==4) return 1;
	else if (mt[tag][0]==2) return 2;
	else if (mt[tag][0]==3) return 3;
	return 4;
}
function sepsort2(tag1, tag2)
{
	new1 = sepsort2_sub(tag1)
	new2 = sepsort2_sub(tag2)
	if (new1 == new2) return (mt[tag1].tagid - mt[tag2].tagid);
	return new1 - new2;
}

function sepsort3(arr1, arr2)
{
	return sepsort1(arr1[0], arr2[0]);
}
function sepsort4(arr1, arr2)
{
	return sepsort2(arr1[0], arr2[0]);
}

function push_check1(tag)
{
	if ((lc[3]&7)==7) {
		if (mt[tag][0]!=5) return;
	} else {
		if (mt[tag][0]==5) return;
		if (lc[7]==0 && (lc[3]&7)==0) {
			if (mt[tag][0]!=1) return;
			for (chki=0; chki<11; chki++) {
				if (!(get_level(tag, chki, 2)&4)) {
					mt[tag][chki*2+1]=0;
					mt[tag][chki*2+2]=0;
				}
			}
		}
		if (lc[7]==0 && (lc[3]&7)==1) {
			if (mt[tag][0]==3) return;
		}
	}
	m.push(tag);
}

function push_check2(tag, type)
{
	if (mt[tag][0]==5) return;
	if (lc[7]==0 && (lc[3]&7)==0) {
		if (mt[tag][0]!=1) return;
		if (!(get_level(tag, type, 2)&4)) return;
	}
	if (lc[7]==0 && (lc[3]&7)==1) {
		if (mt[tag][0]==3) return;
	}
	m.push([tag,type]);
}

function check_sort1()
{
	if ((lc[3]&7)==5) {
		switch(lc[6]) {
			case 0: break;
			case 3: m = m.reverse(); break;
			default: m.sort(versort0); break;
		}
		if (lc[7]!=0) {
			if ((lc[3]&7)==1) m.sort(sepsort1);
			if ((lc[3]&7)==2) m.sort(sepsort2);
		}
	} else {
		switch(lc[5]) {
			case 11: break;
			case 23: m = m.reverse(); break;
			default: m.sort(lvsort); break;
		}
		if (lc[7]!=0) {
			if ((lc[3]&7)==1) m.sort(sepsort1);
			if ((lc[3]&7)==2) m.sort(sepsort2);
		}
	}
}

function disp_all()
{
	switch (lc[1]) {
	case "r": // åüçı
		if (referstr!="") {
			for (tag in mt) {
				searchstr="";
				if (lc[2]&4) searchstr+=titletbl[tag][GENREINDEX]+" ";
				if (lc[2]&1) searchstr+=titletbl[tag][ARTISTINDEX]+" ";
				if (lc[2]&2) {
					searchstr+=titletbl[tag][TITLEINDEX]+" ";
					if (titletbl[tag][SUBTITLEINDEX]) {
						searchstr+=titletbl[tag][SUBTITLEINDEX]+" ";
					}
				}
				if ((searchstr.toLowerCase()).indexOf(referstr.toLowerCase()) >= 0)
					push_check1(tag);
			}
		}
		check_sort1();
		create_table1("SEARCH : \""+referstr+"\"");
		break;
	case "f":
		for (tag in mt) {
			tmp = ""+tag;
			while(tmp.length<8)tmp+=" ";
			if(fav1.indexOf(tmp)>=0) push_check1(tag);
		}
		check_sort1();
		create_table1("FAVORITE ["+m.length+"]");
		break;
	case "v": // ÉoÅ[ÉWÉáÉìï 
		vertbl=["Consumer only","1st style","2nd style","3rd style","4th style",
				"5th style","6th style","7th style","8th style","9th style","10th style",
				"IIDX RED","HAPPY SKY","DistorteD","GOLD","DJ TROOPERS","EMPRESS",
				"SIRIUS","Resort Anthem","Lincle","tricoro","SPADA","PENDUAL","copula"];
		vertbl[28]="substream";
		for (tag in mt) {
			if (titletbl[tag][VERINDEX]==lc[2]) push_check1(tag);
		}
		check_sort1();
		create_table1("VERSION : "+vertbl[lc[2]]+" ["+m.length+"]");
		break;

	case "a":	// ÉAÉãÉtÉ@ÉxÉbÉgï 
		alptbl =["","abcd","efgh","ijkl","mnop","qrst","uvwxyz","_0123456789"];
		astrtbl=["","ABCD","EFGH","IJKL","MNOP","QRST","UVWXYZ","OTHERS"];
		if (lc[2]==0) {
			for (tag in mt) {
				push_check1(tag);
			}
		} else {
			for (tag in mt) {
				if ((alptbl[lc[2]]).indexOf(tag.charAt(0))>=0) push_check1(tag);
			}
		}
		check_sort1();
		if (lc[7]!=0) {
			if ((lc[3]&7)==1) m.sort(sepsort1);
			if ((lc[3]&7)==2) m.sort(sepsort2);
		}
		create_table1((lc[2]==0 ? "ALL MUSIC" : "ALPHABET : "+astrtbl[lc[2]])+" ["+m.length+"]");
		break;

	case "e":	// EXPERT
		p_list = (lc[7]==0) ? e_list[lc[2]] : cs_elist[lc[7]];
		for (pi=0; pi<p_list.length; pi++) {
			m=p_list[pi][1];
			if (lc[2]==2) create_table1(p_list[pi][0]+" ["+m.length+"]");
			else		  create_table1("EXPERT : "+p_list[pi][0]);
		}
		break;

	case "b":
		for (tag in mt) {
			if (mt[tag][4]&2 && mt[tag][4]&8) push_check2(tag, 1);
			if (mt[tag][2]&2 && mt[tag][2]&8) push_check2(tag, 0);
		}
		switch(lc[6]) {
			case 0: break;
			case 3: m = m.reverse(); break;
			case 1:
			case 4: m.sort(versort); break;
			case 2:
			case 5: m.sort(lvsort_bgn); break;
		}
		create_table2("AC BEGINNER ["+m.length+"]");
		break;

	case "p":	// PARTY/STORY/STEP UP
		make_su_data();
		make_pt_list(lc[2]);
		for (pi=0; pi<pt_list[lc[2]].length; pi++) {
			m=pt_list[lc[2]][pi][1];
			create_table_party("STEP UP / "+pt_list[lc[2]][pi][0]+" ["+m.length+"]");
		}
		break;

	case "s": case "d":	// SP/DP
		is_sp = (lc[1]=="s");

		if (lc[2]==0) {		// íià 
			p_list = new Array();
			if (lc[7]==0) p_list = is_sp ? s_list : d_list;
			else		  p_list = is_sp ? cs_slist[lc[7]] : cs_dlist[lc[7]];
			for (pi=0; pi<p_list.length; pi++) {
				m=p_list[pi][1];
				create_table2("íià îFíË : "+p_list[pi][0]);
			}

		} else {
			tist= is_sp ? 2:7;
			tied= tist+(((lc[3]&7)>=2 || lc[7]>0) ? 4: 3);
			if (lc[6]%3==2) {
				tist2 = lc[6]==2 ? tist : tied-1;
				timv  = lc[6]==2 ? 1 : -1;
				for (ti=tist2; tist<=ti && ti<tied; ti+=timv) {
					for (tag in mt) {
						if (get_level(tag, ti ,1)==lc[2]) push_check2(tag, ti);
					}
				}
			} else {
				for (tag in mt) {
					for (ti=tist; ti<tied; ti++) {
						if (get_level(tag, ti ,1)==lc[2]) push_check2(tag, ti);
					}
				}
				switch(lc[6]) {
					case 0: break;
					case 3: m = m.reverse(); break;
					default: m.sort(versort); break;
				}
			}
			if (lc[7]!=0) {
				if ((lc[3]&7)==1) m.sort(sepsort3);
				if ((lc[3]&7)==2) m.sort(sepsort4);
			}
			create_table2((is_sp ? "SP":"DP")+" LEVEL : Åö"+lc[2]+" ["+m.length+"]");
		}
		break;
	} 
}

function refers()
{
	nowval = document.ref.tbox.value;
	if (nowval == "") {
		alert("åüçıï∂éöóÒÇì¸óÕÇµÇƒÇ≠ÇæÇ≥Ç¢");
		return;
	}
	cbox = 0;
	if (document.ref.gen.checked) cbox+=4;
	if (document.ref.tit.checked) cbox+=2;
	if (document.ref.art.checked) cbox+=1;
	if (cbox==0) {
		alert("åüçıëŒè€ÇÇPÇ¬à»è„ëIëÇµÇƒÇ≠ÇæÇ≥Ç¢");
		return;
	}
	ret = "";
	lc[1] = "r";
	lc[2] = cbox;
	for(ii=0; ii<=7; ii++) {
		ret+= (ii>=2 ? str36.charAt(lc[ii]) : lc[ii]);
	}

	refcrdstr = "_";
	for (ri=0; ri<nowval.length; ri++) {
		refcrd = (nowval.charCodeAt(ri)).toString(16);
		while (refcrd.length<4) refcrd = "0"+refcrd;
		refcrdstr += refcrd;
	}

	location.replace(ret+refcrdstr);
}

function submitStop(e){
	if (!e) var e = window.event;
	if (e.keyCode == 13) {refers(); return false;}
}

csvertbl=["AC PENDUAL","CS ñ¢é˚ò^ã»","beatmania US","CS 3rd style","CS 4th style",
		 "CS 5th style","CS 6th style","CS 7th style","CS 8th style","CS 9th style",
		 "CS 10th style","CS IIDX RED","CS HAPPY SKY","CS DistorteD","CS GOLD",
		 "CS DJ TROOPERS","CS EMPRESS","PREMIUM BEST"];
function disp_category()
{
	str="<table><tr>";
	for(i=0;i<28;i++)str+="<td width=20><\/td>";
	str+="<\/tr><tr><th colspan=12>beatmaniaIIDX ïàñ èW for javascript/CSS<\/th>"+
		"<th colspan=6>["+csvertbl[lc[7]]+"]<\/th><th colspan=4><\/th>"+
		"<th colspan=4><a href='readme.html'>Read Me<\/a><\/th>"+
		(lc[7]==0 ? create_aclink("?a00", "G", "ÅÀCS"):create_aclink("?vM1", "0", "ÅÀAC"))+
		"<\/tr><tr bgcolor='#ffffd0'><th colspan=4>ALPHABET<\/th>"+
		get_clink2(   "ALL", 1, "a", 0, 3)+get_clink2(  "ABCD", 1, "a", 1, 3)+
		get_clink2(  "EFGH", 1, "a", 2, 3)+get_clink2(  "IJKL", 1, "a", 3, 3)+
		get_clink2(  "MNOP", 1, "a", 4, 3)+get_clink2(  "QRST", 1, "a", 5, 3)+
		get_clink2("UVWXYZ", 1, "a", 6, 3)+get_clink2("OTHERS", 1, "a", 7, 3)+
		"<\/tr><tr bgcolor='#ffffb8'><th colspan=4 rowspan=2>VERSION<\/th>";

	document.write(str);
	if (lc[7]==0) disp_category_ac();
	else		  disp_category_cs();
}

function disp_refertable()
{
	ret="<td colspan=9 rowspan=3 class=tt1 align=center><form name='ref'>"+
		"<input type=text name=tbox onKeyPress='return submitStop(event)' value=\""+
		referstr+"\"><input type=button value='åüçı' onclick='refers()'><br>"+
		"<input type=checkbox name='gen'"+(lc[1]!="r"||(lc[2]&4)?" checked":"")+">Genre "+
		"<input type=checkbox name='tit'"+(lc[1]!="r"||(lc[2]&2)?" checked":"")+">Title "+
		"<input type=checkbox name='art'"+(lc[1]!="r"||(lc[2]&1)?" checked":"")+">Artist "+
		"<\/td>";
	return ret;
}

function disp_leveltable(chr)
{
	ret=get_clink2("ÇP", 1, chr, 1, 1)+get_clink2("ÇQ", 1, chr, 2, 1)+
		get_clink2("ÇR", 1, chr, 3, 1)+get_clink2("ÇS", 1, chr, 4, 1)+
		get_clink2("ÇT", 1, chr, 5, 1)+get_clink2("ÇU", 1, chr, 6, 1)+
		get_clink2("ÇV", 1, chr, 7, 1);

	if (lc[7]==0 || (lc[3]&8) || lc[7]>=12){
		ret+=get_clink2("ÇW", 1, chr, 8, 1)+get_clink2("ÇX", 1, chr, 9, 1)+
			 get_clink2("10", 1, chr,10, 1)+get_clink2("11", 1, chr,11, 1)+
			 get_clink2("12", 1, chr,12, 1);
	} else if (lc[7]== 2){
		ret+=get_clink2("ÇW", 1, chr, 8, 1)+get_clink2("ÇX", 1, chr, 9, 1)+
			 get_clink2("10", 1, chr,10, 1)+"<td colspan=2><\/td>";
	} else if (lc[7]<= 4){
		ret+="<td colspan=5><\/td>";
	} else if (lc[7]<= 9){
		ret+=get_clink2("7+", 1, chr, 8, 1)+"<td colspan=4><\/td>";
	} else if (lc[7]==10){
		ret+=get_clink2("ÇW", 1, chr, 8, 1)+"<td colspan=4><\/td>";
	} else if (lc[7]==11){
		ret+=get_clink2("ÇW", 1, chr, 8, 1)+get_clink2("8+", 1, chr, 9, 1)+
			"<td colspan=3><\/td>";
	}
	ret+=((lc[7]==0 || 7<=lc[7] && lc[7]<=16) ? get_clink2("Åyíià Åz", 1, chr, 0, 3)
		 : "<td colspan=3><\/td>");
	return ret;
}

function disp_category_cs()
{
	str=get_clink2(  "US", 7,  2, 0, 2)+"<td colspan=6><\/td>"+
		get_clink2( "3rd", 7,  3, 0, 2)+get_clink2( "4th", 7,  4, 0, 2)+
		get_clink2( "5th", 7,  5, 0, 2)+get_clink2( "6th", 7,  6, 0, 2)+
		get_clink2( "7th", 7,  7, 0, 2)+get_clink2( "8th", 7,  8, 0, 2)+
		get_clink2( "9th", 7,  9, 0, 2)+get_clink2("10th", 7, 10, 0, 2)+
		"<\/tr><tr bgcolor='#ffffb8'>"+
		get_clink2( "RED", 7, 11, 0, 2)+get_clink2( "SKY", 7, 12, 0, 2)+
		get_clink2(  "DD", 7, 13, 0, 2)+get_clink2("GOLD", 7, 14, 0, 2)+
		get_clink2( "DJT", 7, 15, 0, 2)+get_clink2( "EMP", 7, 16, 0, 2)+
		get_clink2("BEST", 7, 17, 0, 2)+"<td colspan=7><\/td>"+
		get_clink2( "ñ¢é˚ò^", 7, 1, 0, 3)+

		"<\/tr><tr class=vn><th colspan=4>SP LEVEL<\/th>"+disp_leveltable("s")+
		((lc[7]==17) ? "<td colspan=4><\/td>":get_clink2( "ÅyEXPERTÅz", 1, "e", 0, 4))+
		"<td align=center colspan=3 bgcolor='#e8c8e8'>"+get_clink("FAVORITE", 1, "f", 1)+
		"<\/td><td align=center colspan=2 bgcolor='#e8c8e8'>"+
		"<a href='javascript:fav_clear();'>clear<\/a><\/td>"+

		"<\/tr><tr class=va><th colspan=4>DP LEVEL<\/th>"+disp_leveltable("d")+
		disp_refertable()+

		"<\/tr><tr bgcolor=#e0ffe0><th colspan=4>LIST OP.<\/th>"+
		(13<=lc[7] && lc[7]<=15 ?
		(get_clink2(   "AC LV", 3, lc[3]&8 ? 0: 8, 8, 2)+
		get_clink2(   "MIXED", 3, 0, 0, 2)+get_clink2("NEW/OLD", 3, 1, 0, 3)+
		get_clink2("Separate", 3, 2, 0, 3)+get_clink2("CS IN", 3, 5, 0, 2)+
		get_clink2("5KEYS", 3, 7, 0, 3)) :

		(get_clink2(   "AC LV", 3, lc[3]&8 ? 0: 8, 8, 3)+
		get_clink2(   "MIXED", 3, 0, 0, 3)+get_clink2("NEW/OLD", 3, 1, 0, 3)+
		get_clink2("Separate", 3, 2, 0, 3)+get_clink2("CS IN", 3, 5, 0, 3)))+

		"<\/tr><tr bgcolor=#e0ffe0><th colspan=4>SCORE OP.<\/th>"+
		get_clink2(  "HS 0", 4, 0, 0, 2)+get_clink2("HS 1(def)", 4, 1, 0, 3)+
		get_clink2(  "HS 2", 4, 2, 0, 2)+get_clink2("HS 3", 4, 3, 0, 2)+
		get_clink2( "BTL", 4, lc[4]&4  ? 0: 4, 4, 2)+
		get_clink2("SLIM", 4, lc[4]&8  ? 0: 8, 8, 2)+
		get_clink2( "PRT", 4, lc[4]&16 ? 0:16,16, 2)+"<\/tr><\/table><hr>";
	document.write(str);
}

function disp_category_ac()
{
	str=get_clink2(  "CS", 1, "v", 0, 2)+get_clink2( "1st", 1, "v", 1, 2)+
		get_clink2( "sub", 1, "v",28, 2)+get_clink2( "2nd", 1, "v", 2, 2)+
		get_clink2( "3rd", 1, "v", 3, 2)+get_clink2( "4th", 1, "v", 4, 2)+
		get_clink2( "5th", 1, "v", 5, 2)+get_clink2( "6th", 1, "v", 6, 2)+
		get_clink2( "7th", 1, "v", 7, 2)+get_clink2( "8th", 1, "v", 8, 2)+
		get_clink2( "9th", 1, "v", 9, 2)+get_clink2("10th", 1, "v",10, 2)+
		"<\/tr><tr bgcolor='#ffffb8'>"+
		get_clink2( "RED", 1, "v",11, 2)+get_clink2( "SKY", 1, "v",12, 2)+
		get_clink2(  "DD", 1, "v",13, 2)+get_clink2("GOLD", 1, "v",14, 2)+
		get_clink2( "DJT", 1, "v",15, 2)+get_clink2( "EMP", 1, "v",16, 2)+
		get_clink2( "SIR", 1, "v",17, 2)+get_clink2(  "RA", 1, "v",18, 2)+
		get_clink2(  "LC", 1, "v",19, 2)+get_clink2( "tri", 1, "v",20, 2)+
		get_clink2( "SPA", 1, "v",21, 2)+get_clink2( "PEN", 1, "v",22, 2)+
		

		"<\/tr><tr class=vn><th colspan=4>SP LEVEL<\/th>"+disp_leveltable("s")+
		get_clink2( "Expert", 1, "e", 0, 2)+
		get_clink2( "Event", 1, "e", 2, 2)+
		//get_clink2("BGN", 1, "b", 0, 2)+get_clink2("", 1, "e", 2, 2)+
		"<td align=center colspan=3 bgcolor='#e8c8e8'>"+get_clink("FAVORITE", 1, "f", 1)+
		"<\/td><td align=center colspan=2 bgcolor='#e8c8e8'>"+
		"<a href='javascript:fav_clear();'>clear<\/a><\/td>"+

		"<\/tr><tr class=va><th colspan=4>DP LEVEL<\/th>"+disp_leveltable("d")+
		disp_refertable()+

		"<\/tr><tr bgcolor=#e0ffe0><th colspan=4>LIST OP.<\/th>"+
		get_clink2( "AC only", 3, 0, 0, 3)+get_clink2( "AC+CS", 3, 1, 0, 3)+
		get_clink2(  "SP all", 3, 2, 0, 2)+get_clink2("DP all", 3, 3, 0, 2)+
		get_clink2("Complete", 3, 4, 0, 3)+get_clink2( "CS IN", 3, 5, 0, 2)+

		"<\/tr><tr bgcolor=#e0ffe0><th colspan=4>SCORE OP.<\/th>"+
		get_clink2(  "HS 0", 4, 0, 0, 2)+get_clink2("HS 1(def)", 4, 1, 0, 3)+
		get_clink2(  "HS 2", 4, 2, 0, 2)+get_clink2("HS 3", 4, 3, 0, 2)+
		get_clink2( "BTL", 4, lc[4]&4  ? 0: 4, 4, 2)+
		get_clink2("SLIM", 4, lc[4]&8  ? 0: 8, 8, 2)+
		get_clink2( "PRT", 4, lc[4]&16 ? 0:16,16, 2)+

//		"<\/tr><tr bgcolor=#fff0e0><th colspan=3>STEP/SP<\/th>"+
//		"<th colspan=2>èâêS<\/th>"+get_clink2("ÇP", 1, "p", 1, 1)+
//		get_clink2("ÇQ", 1, "p", 2, 1)+get_clink2("ÇR", 1, "p", 3, 1)+
//		"<th colspan=2>èâãâ<\/th>"+get_clink2("ÇP", 1, "p", 4, 1)+
//		get_clink2("ÇQ", 1, "p", 5, 1)+get_clink2("ÇR", 1, "p", 6, 1)+
//		"<th colspan=2>íÜãâ<\/th>"+get_clink2("ÇP", 1, "p", 7, 1)+
//		get_clink2("ÇQ", 1, "p", 8, 1)+get_clink2("ÇR", 1, "p", 9, 1)+
//		"<th colspan=2>è„ãâ<\/th>"+get_clink2("ÇP", 1, "p",10, 1)+
//		get_clink2("ÇQ", 1, "p",11, 1)+get_clink2("ÇR", 1, "p",12, 1)+
//		"<th colspan=2>äFì`<\/th>"+get_clink2("ÇP", 1, "p",13, 1)+
//		get_clink2("ÇQ", 1, "p",14, 1)+get_clink2("ÇR", 1, "p",15, 1)+
//		"<\/tr><tr bgcolor=#fff0e0><th colspan=3>STEP/DP<\/th>"+
//		"<th colspan=2>èâêS<\/th>"+get_clink2("ÇP", 1, "p",16, 1)+
//		get_clink2("ÇQ", 1, "p",17, 1)+get_clink2("ÇR", 1, "p",18, 1)+
//		"<th colspan=2>èâãâ<\/th>"+get_clink2("ÇP", 1, "p",19, 1)+
//		get_clink2("ÇQ", 1, "p",20, 1)+get_clink2("ÇR", 1, "p",21, 1)+
//		"<th colspan=2>íÜãâ<\/th>"+get_clink2("ÇP", 1, "p",22, 1)+
//		get_clink2("ÇQ", 1, "p",23, 1)+get_clink2("ÇR", 1, "p",24, 1)+
//		"<th colspan=2>è„ãâ<\/th>"+get_clink2("ÇP", 1, "p",25, 1)+
//		get_clink2("ÇQ", 1, "p",26, 1)+get_clink2("ÇR", 1, "p",27, 1)+
//		"<th colspan=2>äFì`<\/th>"+get_clink2("ÇP", 1, "p",28, 1)+
//		get_clink2("ÇQ", 1, "p",29, 1)+get_clink2("ÇR", 1, "p",30, 1)+
		"<\/tr><\/table><hr>";
	document.write(str);
}
