<%@ page import="java.util.*" %>  
<%@ page import="java.io.*" %>  
<%@ page import="java.sql.*" %>  
<%@ page import="java.net.*" %> 
<%@ page import="java.io.*" %>  
<%@ page import="javax.net.ssl.*" %>  
<%@ page import="java.security.cert.*" %>  
<%@ page import="java.text.*" %>  

<%!

class stock
{
String name;
Double strike,ccstrike,pcstrike;
String cstrikes;
String pstrikes;
}

%>

<%!

class displaystock
{
String name;
Double strike,points;


 public String toString(){//overriding the toString() method  
  return name+" "+strike+" "+points;
}  

}

%>

<%!
class checkthread extends Thread
{
String urlString,sym,today,expDate;
StringBuilder data=new StringBuilder("");
Proxy proxy;
public checkthread(String sym,String today,Proxy proxy,String expDate)
	{
	this.sym=sym;
	this.today=today;
	this.proxy=proxy;
	this.expDate=expDate;
	}

	public void run()
	{
		try
		{
if(sym.toString().toLowerCase().contains("nifty"))
{
urlString = "https://www1.nseindia.com/marketinfo/companyTracker/mtOptionKeys.jsp?companySymbol=ADANIENT&indexSymbol="+sym.replace("&","%26")+"&series=EQ&instrument=OPTIDX&date="+expDate;
}
else
urlString = "https://www1.nseindia.com/marketinfo/companyTracker/mtOptionKeys.jsp?companySymbol="+sym.replace("&","%26")+"&indexSymbol=NIFTY&series=EQ&instrument=OPTSTK&date=-";
URL url = new URL(urlString);
URLConnection urlcon=url.openConnection(proxy);
urlcon.setConnectTimeout(60000);
urlcon.setReadTimeout(60000);
urlcon.setRequestProperty("Content-Type", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
urlcon.setRequestProperty("Accept-Encoding", "deflate, br");
urlcon.setRequestProperty("Accept-language","en-US,en;q=0.9");
urlcon.setRequestProperty("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36");
BufferedReader br=new BufferedReader(new InputStreamReader(urlcon.getInputStream()));
StringBuffer output=new StringBuffer("");
String line="";
while((line=br.readLine())!=null)
output.append(line+"\n");
br.close();


String price="0";
String optionData=output.toString();
int index1=0,index2=0,index3=0;


index1=optionData.indexOf("As on");
index2=optionData.indexOf("</nobr>");


String ason = optionData.substring(index1,index2).replace("As on","").replace("&nbsp;Hours IST&nbsp;&nbsp;","").trim();


String search="chcontenttextci";
int atm=0;
while(true)
{
index1=optionData.indexOf(search,index1);
if(index1==-1 && search.equals("chcontenttextci"))
{
search="chcontenttextco";atm=1;
continue;
}
else if(index1==-1 && search.equals("chcontenttextco"))
break;
data.append(sym);
for(int i=0;i<19;i++)
{
 index1=optionData.indexOf("<NOBR>",index1)+6;
 index2=optionData.indexOf("</NOBR>",index1);
 if(i==9)
{
index1=optionData.indexOf("<b>",index1)+3;
index2=optionData.indexOf("</b>",index1);
}
if(i == 1 || i==2 || i == 9 || i==16 || i==18) 
data.append(","+optionData.substring(index1,index2).replace(",","").trim());
}
data.append(","+atm+","+today+","+ason+"\n");
if(atm==1)
atm=0;
}
}
catch (Exception ex)
{
//ex.printStackTrace();
System.out.println("Issue at : "+sym);

data=new StringBuilder("");
}
}
}
%>
<%!
class stats
{
String price="";
String maxcchange = "";
String mincchange= "";
String maxpchange = "";
String minpchange= "";
int clast = 0;
int plast = 0;
String name = "";

}
%>
<%
System.out.println("Started on "+new java.util.Date());
//try
{
TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }
                public void checkServerTrusted(X509Certificate[] certs, String authType) {
                }
            }
        };
System.setProperty("java.net.preferIPv4Stack", "true");
System.setProperty("java.net.useSystemProxies", "true");
System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());


        HostnameVerifier allHostsValid = new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };


 Proxy proxy=null;
Authenticator authenticator = new Authenticator() {
        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication( "6717624", "Pav#12345".toCharArray() );
        }
    };
    Authenticator.setDefault(authenticator);
proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("swglbdomdc", 9090));

        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);

List<stats> cstats=new ArrayList<>(),pstats=new ArrayList<>();
String urlString,date;
StringBuilder data=new StringBuilder("");
urlString = "https://www1.nseindia.com/marketinfo/companyTracker/mtOptionKeys.jsp?companySymbol=ADANIENT&indexSymbol=NIFTY&series=EQ&instrument=OPTIDX&date=-";
URL url = new URL(urlString);
URLConnection urlcon=url.openConnection(proxy);
urlcon.setConnectTimeout(60000);
urlcon.setReadTimeout(60000);
urlcon.setRequestProperty("Content-Type", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
urlcon.setRequestProperty("Accept-Encoding", "deflate, br");
urlcon.setRequestProperty("Accept-language","en-US,en;q=0.9");
urlcon.setRequestProperty("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36");
BufferedReader br=new BufferedReader(new InputStreamReader(urlcon.getInputStream()));
StringBuffer output=new StringBuffer("");
String line="";
while((line=br.readLine())!=null)
output.append(line+"\n");
br.close();


int index1=output.lastIndexOf("--Select--")+10;
index1=output.indexOf("value=",index1)+6;
int index2=output.indexOf(">",index1);

date=output.substring(index1,index2).replace(" selected","");

System.out.println(date);

SimpleDateFormat simple= new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
Class.forName("com.mysql.jdbc.Driver");
Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql","newuser","password");
Statement st=conn.createStatement(),st1=conn.createStatement();
st.execute("select count(*) from alldump where dat like '%"+simple.format(new java.util.Date()).split(" ")[0]+"%'");
{
ResultSet rs=st.getResultSet();
if(rs.next())
{
if((rs.getString(1)+"").equals("0"))
{
try
{
st1.execute("create table alldump"+simple.format(new java.util.Date()).split(" ")[0].replace("/","")+" as select * from alldump");
}
catch(Exception ex)
{
st1.execute("insert into alldump"+simple.format(new java.util.Date()).split(" ")[0].replace("/","")+" select * from alldump");
}
st1.execute("delete from alldump");
}
}
}

List<stock> stocks=new ArrayList<>();

/*String symbols[]={"AARTIIND","ABBOTINDIA","ABFRL","ACC","ADANIENT","ADANIPORTS","ALKEM","AMARAJABAT","AMBUJACEM","APLLTD","APOLLOHOSP","APOLLOTYRE","ASHOKLEY","ASIANPAINT","ASTRAL","ATUL","AUBANK","AUROPHARMA","AXISBANK","BAJAJ-AUTO","BAJAJFINSV","BAJFINANCE","BALKRISIND","BANDHANBNK","BANKBARODA","BANKNIFTY","BATAINDIA","BEL","BERGEPAINT","BHARATFORG","BHARTIARTL","BHEL","BIOCON","BOSCHLTD","BPCL","BRITANNIA","BSOFT","CADILAHC","CANBK","CANFINHOME","CHAMBLFERT","CHOLAFIN","CIPLA","COALINDIA","COFORGE","COLPAL","CONCOR","COROMANDEL","CROMPTON","CUB","CUMMINSIND","DABUR","DALBHARAT","DEEPAKNTR","DELTACORP","DIVISLAB","DIXON","DLF","DRREDDY","EICHERMOT","ESCORTS","EXIDEIND","FEDERALBNK","FINNIFTY","FSL","GAIL","GLENMARK","GMRINFRA","GODREJCP","GODREJPROP","GRANULES","GRASIM","GSPL","GUJGASLTD","HAL","HAVELLS","HCLTECH","HDFC","HDFCAMC","HDFCBANK","HDFCLIFE","HEROMOTOCO","HINDALCO","HINDPETRO","HINDUNILVR","IBULHSGFIN","ICICIBANK","ICICIGI","ICICIPRULI","IDEA","IDFCFIRSTB","IEX","IGL","INDHOTEL","INDIACEM","INDIAMART","INDIGO","INDUSINDBK","INDUSTOWER","INFY","IOC","IPCALAB","IRCTC","ITC","JINDALSTEL","JKCEMENT","JSWSTEEL","JUBLFOOD","KOTAKBANK","L&TFH","LALPATHLAB","LAURUSLABS","LICHSGFIN","LT","LTI","LTTS","LUPIN","M&M","M&MFIN","MANAPPURAM","MARICO","MARUTI","MCDOWELL-N","MCX","METROPOLIS","MFSL","MGL","MINDTREE","MOTHERSUMI","MPHASIS","MRF","MUTHOOTFIN","NAM-INDIA","NATIONALUM","NAUKRI","NAVINFLUOR","NESTLEIND","NIFTY","NMDC","NTPC","OBEROIRLTY","OFSS","ONGC","PAGEIND","PEL","PERSISTENT","PETRONET","PFC","PFIZER","PIDILITIND","PIIND","PNB","POLYCAB","POWERGRID","PVR","RAMCOCEM","RBLBANK","RECLTD","RELIANCE","SAIL","SBICARD","SBILIFE","SBIN","SHREECEM","SIEMENS","SRF","SRTRANSFIN","STAR","SUNPHARMA","SUNTV","SYNGENE","TATACHEM","TATACONSUM","TATAMOTORS","TATAPOWER","TATASTEEL","TCS","TECHM","TITAN","TORNTPHARM","TORNTPOWER","TRENT","TVSMOTOR","UBL","ULTRACEMCO","UPL","VEDL","VOLTAS","WHIRLPOOL","WIPRO","ZEEL"};
int lot[]={850,25,2600,250,500,1250,200,1000,1500,550,125,2500,4500,150,275,75,500,650,1200,250,75,125,200,1800,11700,25,550,3800,1100,750,1886,10500,2300,50,1800,200,1300,1100,5400,975,1500,1250,650,4200,100,350,1563,625,1100,3100,600,1250,250,250,2300,100,125,1650,125,350,550,3600,10000,40,2600,6100,1150,22500,500,325,1550,475,1700,1250,475,500,700,300,200,550,1100,300,1075,2700,300,3100,1375,425,750,70000,9500,1250,1375,3900,2900,75,250,900,2800,300,6500,225,1625,3200,2500,175,1350,125,400,8924,125,900,2000,575,150,200,850,700,4000,3000,1000,100,1250,350,200,650,600,200,3500,325,10,375,1600,8500,125,225,25,50,6700,5700,700,125,7700,30,275,150,3000,6200,125,250,250,16000,300,5333,407,850,2900,6000,250,4750,500,750,1500,25,275,625,400,675,700,1500,850,1000,675,2850,6750,425,150,600,375,250,1500,725,1400,350,100,1300,3100,500,250,800,3000};*/

String symbols[]={"NIFTY","BANKNIFTY","ADANIENT","ADANIPORTS","ASIANPAINT","AXISBANK","BHARTIARTL","DLF","HDFC","HDFCBANK","HINDALCO","HINDUNILVR","IBULHSGFIN","ICICIBANK","INFY","ITC","JINDALSTEL","MARUTI","RELIANCE","SBIN","TATAMOTORS","TATASTEEL","TCS","VEDL","WIPRO","ZEEL","TATACONSUM"};

int lot[]={50,25,500,1250,150,1200,1886,1650,300,550,1075,300,3100,1375,300,3200,2500,100,250,1500,2850,425,150,3100,800,3000,675};

Map lots=new HashMap();
String today=simple.format(new java.util.Date());
Vector syms=new Vector();

for(int i=0;i<symbols.length;i++)
{
lots.put(symbols[i],lot[i]);
syms.add(symbols[i]);
}

checkthread[] checks=new checkthread[symbols.length];

for(int i=0;i<symbols.length;i++)
	{
checks[i] = new checkthread(symbols[i],today,proxy,date);
checks[i].start();
	}


for(int i=0;i<symbols.length;i++)
checks[i].join();




StringBuilder allData=new StringBuilder("");
Vector failed=new Vector();
for(int i=0;i<symbols.length;i++)
	{
	if(checks[i].data.toString().trim().equals(""))
		failed.add(symbols[i]);
	}

System.out.println("Failed count :: "+failed.size());

for(int i=0;i<failed.size();i++)
	{
checks[i] = new checkthread(failed.get(i)+"",today,proxy,date);
checks[i].start();
	}


for(int i=0;i<failed.size();i++)
checks[i].join();




for(int i=0;i<symbols.length;i++)
	{
	allData.append(checks[i].data);
	}
FileOutputStream file=new FileOutputStream("e:\\\\stocks\\\\alldata.csv");
file.write(allData.toString().getBytes());
file.close();

System.out.println("Loading...to DB - "+new java.util.Date());

st.execute("load data local infile 'e:\\\\stocks\\\\alldata.csv' into table alldump fields terminated by ',' lines terminated by '\n'");


System.out.println("Getting data from DB - "+new java.util.Date());
st.execute("select cstrike,name,dat,ason,ceprice,peprice from alldump a where price=1 and dat like '"+today+"' and name in ('"+syms.toString().replace("[","").replace("]","").replace(",","','").replace(" ","")+"') group by name");
ResultSet  rs=st.getResultSet();
int count=0;
String chartdata="";
String jsstrikes="";
String jsnames="";
String ason="";
String ceprices="";
String peprices="";
//String cstats="";
//String pstats="";
while(rs.next())
{
count++;

String strike=rs.getString(1);
jsstrikes+=strike+",";


String name=rs.getString(2);
jsnames+="'"+name+"',";
ason+="'"+rs.getString("ason")+"',";

//System.out.println(name+" "+strike);
Vector strikes = new Vector();
st1.execute("select distinct cstrike from alldump where name like '"+name+"' order by cstrike asc");
ResultSet rs1=st1.getResultSet();
while(rs1.next())
strikes.add(rs1.getString(1));



String[] reqstrikes = new String[11];
try
{
reqstrikes[0]=strikes.get(strikes.indexOf(strike)-2)+"";
}
catch(Exception ex)
{
reqstrikes[0]=strike;
}
try
{
reqstrikes[1]=strikes.get(strikes.indexOf(strike)-1)+"";
}
catch(Exception ex)
{
reqstrikes[1]=strike;
}
reqstrikes[2]=strike;
try
{
reqstrikes[3]=strikes.get(strikes.indexOf(strike)+1)+"";
}
catch(Exception ex)
{
reqstrikes[3]=strike;
}
try
{

reqstrikes[4]=strikes.get(strikes.indexOf(strike)+2)+"";
}
catch(Exception ex)
{
reqstrikes[4]=strike;
}

try
{

reqstrikes[5]=strikes.get(strikes.indexOf(strike)-3)+"";
}
catch(Exception ex)
{
reqstrikes[5]=strike;
}


try
{

reqstrikes[6]=strikes.get(strikes.indexOf(strike)-4)+"";
}
catch(Exception ex)
{
reqstrikes[6]=strike;
}



try
{

reqstrikes[7]=strikes.get(strikes.indexOf(strike)-5)+"";
}
catch(Exception ex)
{
reqstrikes[7]=strike;
}



try
{

reqstrikes[8]=strikes.get(strikes.indexOf(strike)+3)+"";
}
catch(Exception ex)
{
reqstrikes[8]=strike;
}



try
{

reqstrikes[9]=strikes.get(strikes.indexOf(strike)+4)+"";
}
catch(Exception ex)
{
reqstrikes[9]=strike;
}





try
{

reqstrikes[10]=strikes.get(strikes.indexOf(strike)+5)+"";
}
catch(Exception ex)
{
reqstrikes[10]=strike;
}




String reqstrike=reqstrikes[0]+","+reqstrikes[1]+","+reqstrikes[2]+","+reqstrikes[3]+","+reqstrikes[4]+","+reqstrikes[5]+","+reqstrikes[6]+","+reqstrikes[7]+","+reqstrikes[8]+","+reqstrikes[9]+","+reqstrikes[10];
//System.out.println(name +" "+reqstrike+lots.get(name.toUpperCase()));

int l=Integer.parseInt(lots.get(name.toUpperCase())+"");


ceprices+=Double.parseDouble(rs.getString(5))*l+",";
peprices+=Double.parseDouble(rs.getString(6))*l+",";

st1.execute("SET GLOBAL group_concat_max_len = 1000000");

String query="select cstrike,group_concat(cchange/"+l+" order by dat asc),group_concat(pchange/"+l+" order by dat asc),max(cchange/"+l+") as maxcchange,min(cchange/"+l+") as mincchange,max(pchange/"+l+") as maxpchange,min(pchange/"+l+") as minpchange from alldump where dat like '"+rs.getString(3).split(" ")[0]+"%' and cstrike in ("+reqstrike+") and name like '"+rs.getString(2)+"' and dat >= DATE_SUB(NOW(),INTERVAL 2 HOUR) group by cstrike order by cstrike,dat asc";
//System.out.println("Executing Query");
st1.execute(query);
rs1=st1.getResultSet();
ResultSetMetaData  rsmd=rs.getMetaData();

String addCOI[]=new String[reqstrikes.length];
String addPOI[]=new String[reqstrikes.length];



int count1=0;

while(rs1.next())
{
count1++;

stock stoc=new stock();
stoc.name=rs.getString(2)+"";
stoc.strike=Double.parseDouble(rs1.getString(1)+"");
stoc.cstrikes=rs1.getString(2)+"";
stoc.pstrikes=rs1.getString(3)+"";
stoc.pcstrike=Double.parseDouble(reqstrikes[1]+"");
stoc.ccstrike=Double.parseDouble(reqstrikes[2]+"");


stocks.add(stoc);

chartdata+=" var chart"+count+" = new CanvasJS.Chart('chartContainer"+count+count1+"', { "
+"data: [{"
+" type:'line',"
+" axisYType: 'secondary',"
+" name: '"+name +" - "+rs1.getString(1)+"',"
+" showInLegend: true,"
+" markerSize: 0,"
+" dataPoints: [ "
+"{ y : "+rs1.getString(2).replace(",","},{y:")+"}"
+" ]"
+" },"

+"{"
+" type:'line',"
+" axisYType: 'secondary',"
+" name: '"+name +" - "+rs1.getString(1)+"',"
+" showInLegend: true,"
+" markerSize: 0,"
+" dataPoints: [ "
+"{ y : "+rs1.getString(3).replace(",","},{y:")+"}"
+" ]"
+" }"

+" ]"
+"});"
+"chart"+count+".render();\n";

addCOI[count1-1]=rs1.getString(2);
addPOI[count1-1]=rs1.getString(3);

}

//System.out.println("Executing Query1");
Integer coiAdd[]=new Integer[addCOI[0].split(",").length];
Integer poiAdd[]=new Integer[addCOI[0].split(",").length];

String coiString="0",poiString="0";


for(int i=0;i<coiAdd.length;i++)
{

Integer value1=0,value2=0,value3=0,value4=0,value5=0;

try
{
value1=Integer.parseInt(addCOI[0].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value2=Integer.parseInt(addCOI[1].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value3=Integer.parseInt(addCOI[2].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value4=Integer.parseInt(addCOI[3].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value5=Integer.parseInt(addCOI[4].split(",")[i]);
}
catch(Exception ex1)
{
}


coiAdd[i]=value1+value2+value3+value4+value5;


value1=0;value2=0;value3=0;value4=0;value5=0;

try
{
value1=Integer.parseInt(addPOI[0].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value2=Integer.parseInt(addPOI[1].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value3=Integer.parseInt(addPOI[2].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value4=Integer.parseInt(addPOI[3].split(",")[i]);
}
catch(Exception ex1)
{
}

try
{
value5=Integer.parseInt(addPOI[4].split(",")[i]);
}
catch(Exception ex1)
{
}




poiAdd[i]=value1+value2+value3+value4+value5;

coiString+=","+coiAdd[i];
poiString+=","+poiAdd[i];

}


//System.out.println("Executing Query2");

/*chartdata+=" var chart"+count+" = new CanvasJS.Chart('chartContainer"+count+"6', { "
+"data: [{"
+" type:'line',"
+" axisYType: 'secondary',"
+" name: '"+name +" - COI POI',"
+" showInLegend: true,"
+" markerSize: 0,"
+" dataPoints: [ "
+"{ y : "+coiString.replace(",","},{y:")+"}"
+" ]"
+" },"

+"{"
+" type:'line',"
+" axisYType: 'secondary',"
+" name: '"+name +" - COIPOI',"
+" showInLegend: true,"
+" markerSize: 0,"
+" dataPoints: [ "
+"{ y : "+poiString.replace(",","},{y:")+"}"
+" ]"
+" }"
+" ]"
+"});"
+"chart"+count+".render();\n";
*/


}

//System.out.println("Executing Query3");
//System.out.println(cstats);
//System.out.println("------------------");
//System.out.println(pstats);

List<displaystock> cstocks=new ArrayList<>();
List<displaystock> pstocks=new ArrayList<>();

for(int i=0;i<stocks.size();i++)
{

String[] cstrikes1=stocks.get(i).cstrikes.split(",");
String[] pstrikes1=stocks.get(i).pstrikes.split(",");
double[] maxcstrikes = new double[cstrikes1.length];
double[] maxpstrikes = new double[pstrikes1.length];



for(int j=0;j<cstrikes1.length;j++)
maxcstrikes[j]=Double.parseDouble(cstrikes1[j]);

for(int j=0;j<pstrikes1.length;j++)
maxpstrikes[j]=Double.parseDouble(pstrikes1[j]);

double lastcstrike=maxcstrikes[maxcstrikes.length-1];
double lastpstrike=maxpstrikes[maxpstrikes.length-1];

Arrays.sort(maxcstrikes);
Arrays.sort(maxpstrikes);


if(stocks.get(i).strike.compareTo(stocks.get(i).ccstrike) == 0 && stocks.get(i).name.toLowerCase().indexOf("nifty")==-1)
{
displaystock dstock=new displaystock();
dstock.name=stocks.get(i).name;
dstock.strike=stocks.get(i).strike;
dstock.points=(maxcstrikes[maxcstrikes.length-1]-lastcstrike);
cstocks.add(dstock);;
}

if(stocks.get(i).strike.compareTo(stocks.get(i).pcstrike) == 0 && stocks.get(i).name.toLowerCase().indexOf("nifty")==-1)
{
displaystock dstock=new displaystock();
dstock.name=stocks.get(i).name;
dstock.strike=stocks.get(i).strike;
dstock.points=(maxpstrikes[maxpstrikes.length-1]-lastpstrike);
pstocks.add(dstock);
}

//System.out.println(stocks.get(i).name+" "+stocks.get(i).strike+" "+maxcstrikes[0]+" "+maxcstrikes[maxcstrikes.length-1]+" "+maxpstrikes[0]+" "+maxpstrikes[maxpstrikes.length-1]+" "+lastcstrike+" "+lastpstrike+" "+stocks.get(i).pcstrike+" "+stocks.get(i).ccstrike);
}

Collections.sort(cstocks,new Comparator<displaystock>() {
         @Override
        public int compare(displaystock s1, displaystock s2) {
                return s1.points.compareTo(s2.points);
        }
    });

Collections.sort(pstocks,new Comparator<displaystock>() {
         @Override
        public int compare(displaystock s1, displaystock s2) {
                return s1.points.compareTo(s2.points);
        }
    });

 Collections.reverse(cstocks);
 Collections.reverse(pstocks);


System.out.println(cstocks);
System.out.println(pstocks);


conn.close();
%>


<!DOCTYPE HTML>
<html>
<head>  
<title>
<%=today.split(" ")[1]%>
</title>
<%
String time=today.split(" ")[1].replace(":","");
if(Integer.parseInt(time) < 153000)
out.println("<meta http-equiv='refresh' content='30'>");
else
out.println("Markets Ended");
%>

</head>
<script>
window.onload = function () {

<%=chartdata.replace(",{y:}","")%>

}
</script>
</head>
<body>

<table width=100%>


<script language='javascript'>

var strikes=[<%=jsstrikes%>];
var names=[<%=jsnames%>];
var ceprices=[<%=ceprices%>];
var peprices=[<%=peprices%>];





var liquid=["NIFTY"];

for(var i=0;i<<%=count%>;i++)
{
var liq="";
if(liquid.includes(names[i]))
liq="(liquid)";
document.writeln("<tR>");
document.writeln("<td colspan=6><hr><center> ("+(i+1)+") "+names[i]+""+liq+"::"+strikes[i]+" - "+ceprices[i]+" - "+peprices[i]+" </center></td>");
document.writeln("</tR>");
document.writeln("<tR>");
document.writeln("<td><div id='chartContainer"+(i+1)+"1' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"2' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"3' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"4' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"5' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"6' style='height: 300px; width: 100%;'></div></td>");
document.writeln("</tr>");
document.writeln("<tR>");
document.writeln("<td><div id='chartContainer"+(i+1)+"7' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"8' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"9' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"10' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"11' style='height: 300px; width: 100%;'></div></td>");
document.writeln("<td><div id='chartContainer"+(i+1)+"12' style='height: 300px; width: 100%;'></div></td>");
document.writeln("</tR>");
}
</script>

</table>

<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

<table>
<tr> <th> Buy  </th> <th> Sell </th> </tr>
<tr> 
<td> <%=cstocks.toString().replaceAll(",","<br>")%> </td>
<td> <%=pstocks.toString().replaceAll(",","<br>")%> </td>
</tr>
</table>
</body>
</html>
<%
}
/*catch(Exception ex)
{
ex.printStackTrace();
response.sendRedirect("buildstocksthread.jsp");
}*/
System.out.println("Server Side ended - "+new java.util.Date());
%>
