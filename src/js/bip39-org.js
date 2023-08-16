/**
 * @file bip39-org.js
 * @authors:
 *   Bip39 Org <info@bip39.org>
 * @date 2023
 * @license MIT LICENSE
 * Each function may contain the original source referred by
 * and may have a different open-source license from different authors.
 *
 * Supports both Browser and NodeJS without bundlers or transcompilers
 */

/**
 * Functions wrapped under bip39Org object prototype
 * so they do not pollute global namespace
 * which enables less conflict with other libraries imported
 * Global Namespaces used here:
 * globalThis.bip39Org
 * globalThis.isDebug (boolean) used to debug output to console
 * globalThis.WebCrypto (Optional)
 * globalThis.crypto (Optional)
 * globalThis.wordlist (string[], Optional) Array of BIP39 word list,
 * define your language wordlist here
 */
const bip39Org = (() => {
  // Default BIP39 english wordlist
  const DEFAULT_WORDLIST = ['abandon','ability','able','about','above','absent','absorb','abstract','absurd','abuse','access','accident','account','accuse','achieve','acid','acoustic','acquire','across','act','action','actor','actress','actual','adapt','add','addict','address','adjust','admit','adult','advance','advice','aerobic','affair','afford','afraid','again','age','agent','agree','ahead','aim','air','airport','aisle','alarm','album','alcohol','alert','alien','all','alley','allow','almost','alone','alpha','already','also','alter','always','amateur','amazing','among','amount','amused','analyst','anchor','ancient','anger','angle','angry','animal','ankle','announce','annual','another','answer','antenna','antique','anxiety','any','apart','apology','appear','apple','approve','april','arch','arctic','area','arena','argue','arm','armed','armor','army','around','arrange','arrest','arrive','arrow','art','artefact','artist','artwork','ask','aspect','assault','asset','assist','assume','asthma','athlete','atom','attack','attend','attitude','attract','auction','audit','august','aunt','author','auto','autumn','average','avocado','avoid','awake','aware','away','awesome','awful','awkward','axis','baby','bachelor','bacon','badge','bag','balance','balcony','ball','bamboo','banana','banner','bar','barely','bargain','barrel','base','basic','basket','battle','beach','bean','beauty','because','become','beef','before','begin','behave','behind','believe','below','belt','bench','benefit','best','betray','better','between','beyond','bicycle','bid','bike','bind','biology','bird','birth','bitter','black','blade','blame','blanket','blast','bleak','bless','blind','blood','blossom','blouse','blue','blur','blush','board','boat','body','boil','bomb','bone','bonus','book','boost','border','boring','borrow','boss','bottom','bounce','box','boy','bracket','brain','brand','brass','brave','bread','breeze','brick','bridge','brief','bright','bring','brisk','broccoli','broken','bronze','broom','brother','brown','brush','bubble','buddy','budget','buffalo','build','bulb','bulk','bullet','bundle','bunker','burden','burger','burst','bus','business','busy','butter','buyer','buzz','cabbage','cabin','cable','cactus','cage','cake','call','calm','camera','camp','can','canal','cancel','candy','cannon','canoe','canvas','canyon','capable','capital','captain','car','carbon','card','cargo','carpet','carry','cart','case','cash','casino','castle','casual','cat','catalog','catch','category','cattle','caught','cause','caution','cave','ceiling','celery','cement','census','century','cereal','certain','chair','chalk','champion','change','chaos','chapter','charge','chase','chat','cheap','check','cheese','chef','cherry','chest','chicken','chief','child','chimney','choice','choose','chronic','chuckle','chunk','churn','cigar','cinnamon','circle','citizen','city','civil','claim','clap','clarify','claw','clay','clean','clerk','clever','click','client','cliff','climb','clinic','clip','clock','clog','close','cloth','cloud','clown','club','clump','cluster','clutch','coach','coast','coconut','code','coffee','coil','coin','collect','color','column','combine','come','comfort','comic','common','company','concert','conduct','confirm','congress','connect','consider','control','convince','cook','cool','copper','copy','coral','core','corn','correct','cost','cotton','couch','country','couple','course','cousin','cover','coyote','crack','cradle','craft','cram','crane','crash','crater','crawl','crazy','cream','credit','creek','crew','cricket','crime','crisp','critic','crop','cross','crouch','crowd','crucial','cruel','cruise','crumble','crunch','crush','cry','crystal','cube','culture','cup','cupboard','curious','current','curtain','curve','cushion','custom','cute','cycle','dad','damage','damp','dance','danger','daring','dash','daughter','dawn','day','deal','debate','debris','decade','december','decide','decline','decorate','decrease','deer','defense','define','defy','degree','delay','deliver','demand','demise','denial','dentist','deny','depart','depend','deposit','depth','deputy','derive','describe','desert','design','desk','despair','destroy','detail','detect','develop','device','devote','diagram','dial','diamond','diary','dice','diesel','diet','differ','digital','dignity','dilemma','dinner','dinosaur','direct','dirt','disagree','discover','disease','dish','dismiss','disorder','display','distance','divert','divide','divorce','dizzy','doctor','document','dog','doll','dolphin','domain','donate','donkey','donor','door','dose','double','dove','draft','dragon','drama','drastic','draw','dream','dress','drift','drill','drink','drip','drive','drop','drum','dry','duck','dumb','dune','during','dust','dutch','duty','dwarf','dynamic','eager','eagle','early','earn','earth','easily','east','easy','echo','ecology','economy','edge','edit','educate','effort','egg','eight','either','elbow','elder','electric','elegant','element','elephant','elevator','elite','else','embark','embody','embrace','emerge','emotion','employ','empower','empty','enable','enact','end','endless','endorse','enemy','energy','enforce','engage','engine','enhance','enjoy','enlist','enough','enrich','enroll','ensure','enter','entire','entry','envelope','episode','equal','equip','era','erase','erode','erosion','error','erupt','escape','essay','essence','estate','eternal','ethics','evidence','evil','evoke','evolve','exact','example','excess','exchange','excite','exclude','excuse','execute','exercise','exhaust','exhibit','exile','exist','exit','exotic','expand','expect','expire','explain','expose','express','extend','extra','eye','eyebrow','fabric','face','faculty','fade','faint','faith','fall','false','fame','family','famous','fan','fancy','fantasy','farm','fashion','fat','fatal','father','fatigue','fault','favorite','feature','february','federal','fee','feed','feel','female','fence','festival','fetch','fever','few','fiber','fiction','field','figure','file','film','filter','final','find','fine','finger','finish','fire','firm','first','fiscal','fish','fit','fitness','fix','flag','flame','flash','flat','flavor','flee','flight','flip','float','flock','floor','flower','fluid','flush','fly','foam','focus','fog','foil','fold','follow','food','foot','force','forest','forget','fork','fortune','forum','forward','fossil','foster','found','fox','fragile','frame','frequent','fresh','friend','fringe','frog','front','frost','frown','frozen','fruit','fuel','fun','funny','furnace','fury','future','gadget','gain','galaxy','gallery','game','gap','garage','garbage','garden','garlic','garment','gas','gasp','gate','gather','gauge','gaze','general','genius','genre','gentle','genuine','gesture','ghost','giant','gift','giggle','ginger','giraffe','girl','give','glad','glance','glare','glass','glide','glimpse','globe','gloom','glory','glove','glow','glue','goat','goddess','gold','good','goose','gorilla','gospel','gossip','govern','gown','grab','grace','grain','grant','grape','grass','gravity','great','green','grid','grief','grit','grocery','group','grow','grunt','guard','guess','guide','guilt','guitar','gun','gym','habit','hair','half','hammer','hamster','hand','happy','harbor','hard','harsh','harvest','hat','have','hawk','hazard','head','health','heart','heavy','hedgehog','height','hello','helmet','help','hen','hero','hidden','high','hill','hint','hip','hire','history','hobby','hockey','hold','hole','holiday','hollow','home','honey','hood','hope','horn','horror','horse','hospital','host','hotel','hour','hover','hub','huge','human','humble','humor','hundred','hungry','hunt','hurdle','hurry','hurt','husband','hybrid','ice','icon','idea','identify','idle','ignore','ill','illegal','illness','image','imitate','immense','immune','impact','impose','improve','impulse','inch','include','income','increase','index','indicate','indoor','industry','infant','inflict','inform','inhale','inherit','initial','inject','injury','inmate','inner','innocent','input','inquiry','insane','insect','inside','inspire','install','intact','interest','into','invest','invite','involve','iron','island','isolate','issue','item','ivory','jacket','jaguar','jar','jazz','jealous','jeans','jelly','jewel','job','join','joke','journey','joy','judge','juice','jump','jungle','junior','junk','just','kangaroo','keen','keep','ketchup','key','kick','kid','kidney','kind','kingdom','kiss','kit','kitchen','kite','kitten','kiwi','knee','knife','knock','know','lab','label','labor','ladder','lady','lake','lamp','language','laptop','large','later','latin','laugh','laundry','lava','law','lawn','lawsuit','layer','lazy','leader','leaf','learn','leave','lecture','left','leg','legal','legend','leisure','lemon','lend','length','lens','leopard','lesson','letter','level','liar','liberty','library','license','life','lift','light','like','limb','limit','link','lion','liquid','list','little','live','lizard','load','loan','lobster','local','lock','logic','lonely','long','loop','lottery','loud','lounge','love','loyal','lucky','luggage','lumber','lunar','lunch','luxury','lyrics','machine','mad','magic','magnet','maid','mail','main','major','make','mammal','man','manage','mandate','mango','mansion','manual','maple','marble','march','margin','marine','market','marriage','mask','mass','master','match','material','math','matrix','matter','maximum','maze','meadow','mean','measure','meat','mechanic','medal','media','melody','melt','member','memory','mention','menu','mercy','merge','merit','merry','mesh','message','metal','method','middle','midnight','milk','million','mimic','mind','minimum','minor','minute','miracle','mirror','misery','miss','mistake','mix','mixed','mixture','mobile','model','modify','mom','moment','monitor','monkey','monster','month','moon','moral','more','morning','mosquito','mother','motion','motor','mountain','mouse','move','movie','much','muffin','mule','multiply','muscle','museum','mushroom','music','must','mutual','myself','mystery','myth','naive','name','napkin','narrow','nasty','nation','nature','near','neck','need','negative','neglect','neither','nephew','nerve','nest','net','network','neutral','never','news','next','nice','night','noble','noise','nominee','noodle','normal','north','nose','notable','note','nothing','notice','novel','now','nuclear','number','nurse','nut','oak','obey','object','oblige','obscure','observe','obtain','obvious','occur','ocean','october','odor','off','offer','office','often','oil','okay','old','olive','olympic','omit','once','one','onion','online','only','open','opera','opinion','oppose','option','orange','orbit','orchard','order','ordinary','organ','orient','original','orphan','ostrich','other','outdoor','outer','output','outside','oval','oven','over','own','owner','oxygen','oyster','ozone','pact','paddle','page','pair','palace','palm','panda','panel','panic','panther','paper','parade','parent','park','parrot','party','pass','patch','path','patient','patrol','pattern','pause','pave','payment','peace','peanut','pear','peasant','pelican','pen','penalty','pencil','people','pepper','perfect','permit','person','pet','phone','photo','phrase','physical','piano','picnic','picture','piece','pig','pigeon','pill','pilot','pink','pioneer','pipe','pistol','pitch','pizza','place','planet','plastic','plate','play','please','pledge','pluck','plug','plunge','poem','poet','point','polar','pole','police','pond','pony','pool','popular','portion','position','possible','post','potato','pottery','poverty','powder','power','practice','praise','predict','prefer','prepare','present','pretty','prevent','price','pride','primary','print','priority','prison','private','prize','problem','process','produce','profit','program','project','promote','proof','property','prosper','protect','proud','provide','public','pudding','pull','pulp','pulse','pumpkin','punch','pupil','puppy','purchase','purity','purpose','purse','push','put','puzzle','pyramid','quality','quantum','quarter','question','quick','quit','quiz','quote','rabbit','raccoon','race','rack','radar','radio','rail','rain','raise','rally','ramp','ranch','random','range','rapid','rare','rate','rather','raven','raw','razor','ready','real','reason','rebel','rebuild','recall','receive','recipe','record','recycle','reduce','reflect','reform','refuse','region','regret','regular','reject','relax','release','relief','rely','remain','remember','remind','remove','render','renew','rent','reopen','repair','repeat','replace','report','require','rescue','resemble','resist','resource','response','result','retire','retreat','return','reunion','reveal','review','reward','rhythm','rib','ribbon','rice','rich','ride','ridge','rifle','right','rigid','ring','riot','ripple','risk','ritual','rival','river','road','roast','robot','robust','rocket','romance','roof','rookie','room','rose','rotate','rough','round','route','royal','rubber','rude','rug','rule','run','runway','rural','sad','saddle','sadness','safe','sail','salad','salmon','salon','salt','salute','same','sample','sand','satisfy','satoshi','sauce','sausage','save','say','scale','scan','scare','scatter','scene','scheme','school','science','scissors','scorpion','scout','scrap','screen','script','scrub','sea','search','season','seat','second','secret','section','security','seed','seek','segment','select','sell','seminar','senior','sense','sentence','series','service','session','settle','setup','seven','shadow','shaft','shallow','share','shed','shell','sheriff','shield','shift','shine','ship','shiver','shock','shoe','shoot','shop','short','shoulder','shove','shrimp','shrug','shuffle','shy','sibling','sick','side','siege','sight','sign','silent','silk','silly','silver','similar','simple','since','sing','siren','sister','situate','six','size','skate','sketch','ski','skill','skin','skirt','skull','slab','slam','sleep','slender','slice','slide','slight','slim','slogan','slot','slow','slush','small','smart','smile','smoke','smooth','snack','snake','snap','sniff','snow','soap','soccer','social','sock','soda','soft','solar','soldier','solid','solution','solve','someone','song','soon','sorry','sort','soul','sound','soup','source','south','space','spare','spatial','spawn','speak','special','speed','spell','spend','sphere','spice','spider','spike','spin','spirit','split','spoil','sponsor','spoon','sport','spot','spray','spread','spring','spy','square','squeeze','squirrel','stable','stadium','staff','stage','stairs','stamp','stand','start','state','stay','steak','steel','stem','step','stereo','stick','still','sting','stock','stomach','stone','stool','story','stove','strategy','street','strike','strong','struggle','student','stuff','stumble','style','subject','submit','subway','success','such','sudden','suffer','sugar','suggest','suit','summer','sun','sunny','sunset','super','supply','supreme','sure','surface','surge','surprise','surround','survey','suspect','sustain','swallow','swamp','swap','swarm','swear','sweet','swift','swim','swing','switch','sword','symbol','symptom','syrup','system','table','tackle','tag','tail','talent','talk','tank','tape','target','task','taste','tattoo','taxi','teach','team','tell','ten','tenant','tennis','tent','term','test','text','thank','that','theme','then','theory','there','they','thing','this','thought','three','thrive','throw','thumb','thunder','ticket','tide','tiger','tilt','timber','time','tiny','tip','tired','tissue','title','toast','tobacco','today','toddler','toe','together','toilet','token','tomato','tomorrow','tone','tongue','tonight','tool','tooth','top','topic','topple','torch','tornado','tortoise','toss','total','tourist','toward','tower','town','toy','track','trade','traffic','tragic','train','transfer','trap','trash','travel','tray','treat','tree','trend','trial','tribe','trick','trigger','trim','trip','trophy','trouble','truck','true','truly','trumpet','trust','truth','try','tube','tuition','tumble','tuna','tunnel','turkey','turn','turtle','twelve','twenty','twice','twin','twist','two','type','typical','ugly','umbrella','unable','unaware','uncle','uncover','under','undo','unfair','unfold','unhappy','uniform','unique','unit','universe','unknown','unlock','until','unusual','unveil','update','upgrade','uphold','upon','upper','upset','urban','urge','usage','use','used','useful','useless','usual','utility','vacant','vacuum','vague','valid','valley','valve','van','vanish','vapor','various','vast','vault','vehicle','velvet','vendor','venture','venue','verb','verify','version','very','vessel','veteran','viable','vibrant','vicious','victory','video','view','village','vintage','violin','virtual','virus','visa','visit','visual','vital','vivid','vocal','voice','void','volcano','volume','vote','voyage','wage','wagon','wait','walk','wall','walnut','want','warfare','warm','warrior','wash','wasp','waste','water','wave','way','wealth','weapon','wear','weasel','weather','web','wedding','weekend','weird','welcome','west','wet','whale','what','wheat','wheel','when','where','whip','whisper','wide','width','wife','wild','will','win','window','wine','wing','wink','winner','winter','wire','wisdom','wise','wish','witness','wolf','woman','wonder','wood','wool','word','work','world','worry','worth','wrap','wreck','wrestle','wrist','write','wrong','yard','year','yellow','you','young','youth','zebra','zero','zone','zoo'];

  /**
   * This module requires WebCrypto API
   * Browser: Do nothing (Use modern browser)
   * NodeJS: Refer to docs for each NodeJS version or use a polyfill (like @peculiar/webcrypto)
   * For NodeJS export require('node:crypto').webcrypto
   * to either global.WebCrypto or global.crypto
   */
  const isNode = (typeof globalThis.window === 'undefined');

  const crypto = (() => {
    let globalCrypto = globalThis.WebCrypto ?? globalThis.crypto;

    // Use global WebCrypto API for Browser
    if (!(typeof globalCrypto === 'undefined' || typeof globalCrypto.constants !== 'undefined')) {
      return globalCrypto;
    }

    // Use WebCrypto from NodeJS (Works if NodeJS have native WebCrypto support)
    if (isNode && typeof require('crypto') !== 'undefined' && typeof require('crypto').webcrypto !== 'undefined') {
      return require('crypto').webcrypto;
    }

    // Should throw an error on older NodeJS versions without a polyfill
    throw new Error('WebCrypto Required');
  })();

  // crypto.constants are exposed for default nodejs crypto object including the older nodejs versions
  if (typeof crypto === 'undefined' || typeof crypto.constants !== 'undefined') {
    throw new Error('WebCrypto Required');
  }

  // The current revision of the function
  const REVISION = 1;

  /**
   * Turn on debug mode with the following
   * globalThis.isDebug = true;
   */

  const CONSOLE_LINEBREAK = '\n----------------------------------------------------------\n';

  /**
   * Show on the console if it is debug
   * @param {string} msg Show custom message before any messages
   * @param {string} input A string that could be displayed through console.log
   */
  const showConsole = (msg, inputFunc) => {
    if (typeof msg !== 'string' || typeof inputFunc !== 'function') {
      throw new Error('showConsole: Invalid console output');
    }

    if (globalThis.isDebug) {
      const logText = msg === CONSOLE_LINEBREAK ? CONSOLE_LINEBREAK : msg + ': ' + inputFunc() + '\n';
      console.log(logText);
    }
  };

  /**
   WARNING: Do not use isHex, isBin, or isNum functions to distinguish each other
   as the following would return true

   isBin('1000000000') === true
   isNum('1000000000') === true
   isHex('1000000000') === true

   Use TypedData instead
   */

  /**
   * Deal Numberish (Number, String, BigNumber, BigInt, BN) types to plain string
   * This function doesn't check exponents so please use it with caution
   * @param {(Number|String|BigNumber|BigInt|BN)} numberish Something to convert to string
   * @returns {string} String including number or bigint
   */
  const numToString = (numberish) => {
    // We parse number types however javascript numbers are insecure, use it with caution
    if (typeof numberish === 'string' || typeof numberish === 'number' || typeof maybeNum === 'bigint') {
      return BigInt(numberish).toString();
    }
    return numberish.toString();
  };

  /**
   * Checks if the string is a number string
   * @param {(Number|String|BigNumber|BigInt|BN)} maybeNum Something to test if it is a number
   * @returns {boolean} Returns true if the string is a number
   */
  const isNum = (maybeNum) => {
    try {
      let numLength;
      if (typeof maybeNum === 'string') {
        numLength = maybeNum.length;
        maybeNum = numToString(maybeNum);
      } else {
        maybeNum = numToString(maybeNum);
        numLength = maybeNum.length;
      }
      return maybeNum
        .match(/[0-9]/gi)
        .length === numLength;
    // Catching error while hex numbers are in without prefix
    } catch (e) {
      return false;
    }
  };

  /**
   * Checks if the string is a hex string
   * @param {string} maybeHex string input to test if it is a hex
   * @returns {boolean} Returns true if the string is hex
   * @see {@link https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript}
   */
  const isHex = (maybeHex) => {
    // Remove hex prefix if it have
    maybeHex = maybeHex.replace('0x', '');

    return maybeHex.length !== 0 && !/[^a-fA-F0-9]/u.test(maybeHex);
  };

  /**
   * Checks if the hex is correctly formatted
   * @param {string} maybeHex string input to test if it is a hex
   * @returns {boolean} Returns true if the hex string is correctly formatted
   */
  const isHexFormatted = (maybeHex) => {
    // Check for prefix
    if (maybeHex.slice(0, 2) !== '0x') {
      return false;
    }
    // Remove hex prefix if it have
    maybeHex = maybeHex.replace('0x', '');

    return maybeHex.length !== 0 && maybeHex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(maybeHex);
  };

  /**
   * Create a valid length of checksummed hex
   * @param {string} hexString hex number string to format to
   * @returns {string} Returns formatted hex string with prefix
   */
  const formatHex = (hexString) => {
    if (!isHex(hexString)) {
      const errMsg = 'Invalid Hex: ' + hexString;
      throw new Error(errMsg);
    }

    const isChecksum = hexString.slice(0, 2) === '0x';
    const checkLength = hexString.length % 2 == 0;

    let newHex = '0x';
    newHex += checkLength ? '' : '0';
    newHex += isChecksum ? hexString.slice(2) : hexString;

    return newHex;
  };

  /**
   * Checks if the string is a binary string
   * @param {string} maybeBin string input to test if it is binary
   * @returns {boolean} Returns true if the string is binary
   */
  const isBin = (maybeBin) => maybeBin.split('').map(b => [0, 1].includes(parseInt(b))).filter(b => b).length === maybeBin.length;

  /**
   * Format binary string to correct length (could be divided by 8)
   * @param {string} binString binary input to format
   * @returns {string} Returns correctly formatted binary number string
   */
  const formatBin = (binString) => {
    while (binString.length % 8 != 0) {
      binString = '0' + binString;
    }
    return binString;
  };

  const StringType = ['binary', 'number', 'hex', 'string'];

  /** Class representing typed data (To use data correctly) **/
  class TypedData {
    /**
     * Create a new TypedData
     * @param {string} data - String encoded data.
     * @param {string} type - One of binary / number (10 base) / hex / string
     */
    constructor(data, type) {
      if (!StringType.includes(type)) {
        throw new Error('TypedData: Unsupported Type');
      }

      if (type === 'hex') {
        this.data = formatHex(data);
      } else if (type === 'number') {
        this.data = numToString(data);
      } else if (type === 'binary') {
        this.data = formatBin(data);
      } else {
        this.data = data;
      }

      this.type = type;
    }

    from(data, type) {
      return new TypedData(data, type);
    }

    reset() {
      return new TypedData(this.data, 'string');
    }
  }

  /**
   * Matcher to get the accurate type of string
   * matchers return an array of the matched events for each type of entropy.
   * @see {@link https://github.com/iancoleman/bip39/blob/master/src/js/entropy.js}
   */
  const matchers = {
    binary: function(str) {
      return str.match(/[0-1]/gi) || [];
    },
    number: function(str) {
      return str.match(/[0-9]/gi) || [];
    },
    hex: function(str) {
      return str.match(/[0-9A-F]/gi) || [];
    },
  };

  /**
   * Classify Input and return probable type (Not accurate - use TypedData always)
   * @param {string} data Input to classify
   * @returns {string} Type of data
   * @see {@link https://github.com/iancoleman/bip39/blob/master/src/js/entropy.js#L251}
   */
  const classifyInput = (data) => {
    // https://github.com/iancoleman/bip39/blob/master/src/js/entropy.js#L251
    const binaryMatches = matchers.binary(data);
    const hexMatches = matchers.hex(data);
    const base10Matches = matchers.number(data);
    const isHexPrefixed = data.slice(0, 2) === '0x';

    if (binaryMatches.length == hexMatches.length && hexMatches.length > 0 && !isHexPrefixed && isBin(data)) {
      return 'binary';
    }
    if (base10Matches.length == hexMatches.length && hexMatches.length > 0 && !isHexPrefixed && isNum(data)) {
      return 'number';
    }
    if (isHex(data)) {
      return 'hex';
    }

    return 'string';
  };

  /**
   * Parse binary string and convert it to bytes
   * Would work for an enormous length of the binary string as well
   * @param {string} binaryString Valid binary string
   * @returns {Uint8Array} Binary string in bytes
   */
  const binToBytes = (binaryString) => {
    binaryString = formatBin(binaryString);
    return new Uint8Array(binaryString.match(/(.{1,8})/g).map(bin => parseInt(bin, 2)));
  };

  /**
   * Parse hex string and return bytes buffer with the correct length
   * Does the same as Buffer.from(hexString).toString('hex')
   * @param {string} hexString Valid hex string
   * @returns {Uint8Array} Hex string in bytes
   * @see {@link https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript}
   */
  const hexToBytes = (hexString) => {
    if (hexString.slice(0, 2) === '0x') {
      hexString = hexString.replace('0x', '');
    }
    if (hexString.length % 2 !== 0) {
      hexString = '0' + hexString;
    }
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  };

  /**
   * Convert numbers to bytes using BigInt API
   * @param {(Number|String|BigNumber|BigInt|BN)} numberish Something to convert to string
   * @returns {Uint8Array} Number in bytes array
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt}
   */
  const numToBytes = (numberish) => {
    return hexToBytes(BigInt(numToString(numberish)).toString(16));
  };

  /**
   * Converts string to Uint8Array
   * @param {(string|TypedData|Uint8Array)} data something to convert to Uint8Array
   * Valid input
   * 100000000000000000 => Binary / Number (If overrides)
   * 0x100000000000000000 => Hex
   * 0x1aaaaaaaaa => Hex
   * 1aaaaaaaaa => String
   * @param {boolean} forceString Force parsing bytes from string
   * @returns {Uint8Array} bytes of string
   */
  const toBytes = (data, forceString) => {
    if (data instanceof Uint8Array) {
      return data;
    }
    const isTypedData = (typeof data === 'object' && data instanceof TypedData);
    const dataType = forceString ? 'string'
      : isTypedData ? data.type
        : (typeof data === 'string') ? classifyInput(data)
          : 'string';
    let parsedData = isTypedData ? data.data : data;
    // Remove hex prefix
    if (typeof parsedData === 'string' && parsedData.slice(0, 2) === '0x') {
      parsedData = parsedData.replace('0x', '');
    }

    if (dataType === 'binary') {
      return binToBytes(parsedData);
    }
    if (dataType === 'number') {
      return numToBytes(parsedData);
    }
    if (dataType === 'hex') {
      return hexToBytes(parsedData);
    }

    return new TextEncoder().encode(parsedData);
  };

  /**
   * Converts bytes array to prefixed hex string
   * @param {Uint8Array} bytes Buffered bytes to convert to hex string
   * @returns {TypedData} Typed Hex string
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest}
   */
  const bytesToHex = (bytes) => {
    return new TypedData(
      '0x' + Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join(''),
      'hex'
    );
  };

  /**
   * Converts bytes array to a binary string
   * @param {Uint8Array} bytes Buffered bytes to convert to a binary string
   * @returns {TypedData} Typed Binary string
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/utils.ts#L25}
   */
  const bytesToBin = (bytes) => {
    return new TypedData(
      Array.from(bytes).map((b) => b.toString(2).padStart(8, '0')).join(''),
      'binary'
    );
  };

  /**
   * Converts bytes array to the number string
   * @param {Uint8Array} bytes Buffered bytes to convert to the number string
   * @returns {TypedData} Typed Number string
   */
  const bytesToNum = (bytes) => {
    return new TypedData(
      BigInt(bytesToHex(bytes).data).toString(),
      'number'
    );
  };

  /**
   * Converts bytes array to plain string
   * @param {Uint8Array} bytes Buffered bytes to convert to a plain text string
   * @returns {string} Text String
   */
  const bytesToString = (bytes) => {
    return new TextEncoder().decode(bytes);
  };

  /**
   * Generate secure random bytes with the desired length
   * @param {number} bytesLength Length of bytes to generate
   * @returns {Uint8Array} Cryptographically secure random bytes
   */
  const getRandomBytes = (bytesLength = 32) => {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  };

  /**
   * Digest string or Uint8Array and return Uint8Array using WebCrypto API
   * @param {(string|TypedData|Uint8Array)} input something to digest in SHA hash
   * @param {boolean} toHex Output to hex string
   * @param {boolean} forceString Hash sha from string (not parsed numbers for compatiblity)
   * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} algorithm SHA to digest
   * @returns {Uint8Array|TypedData} bytes of digested string
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/crypto.ts#L14} MIT LICENSE
   */
  const sha = async (input, toHex = false, forceString = false, algorithm = 'SHA-512') => {
    const arrayBuffer = await crypto.subtle.digest(algorithm, toBytes(input, forceString));
    return toHex ? bytesToHex(new Uint8Array(arrayBuffer)) : new Uint8Array(arrayBuffer);
  };

  /**
   * Repeat SHA digest operations
   * (To enhance security repeating hashing will take place with hex string only (not parsed numbers))
   * @param {(string|TypedData|Uint8Array)} input something to digest in SHA hash
   * @param {number} count Number to repeat the function
   * @param {boolean} toHex returns Typed Hex instead of Uint8Array
   * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} algorithm SHA to digest
   * @returns {Uint8Array|TypedData} bytes of digested string
   */
  const repeatSha = async (input, count = 1, toHex = false, algorithm) => {
    const arr = (count > 1) ? Array.from(Array(count - 1)) : [];
    let output = await sha(input, true, true, algorithm);
    // eslint-disable-next-line no-unused-vars
    for await (const a of arr) {
      output = await sha(output, true, true, algorithm);
    }
    return toHex ? output : toBytes(output);
  };

  /**
   * Do password hashing with PBKDF2 algorithm using WebCrypto API
   * (Key generation and params for PBKDF2 default to match with the one used with BIP39 Seed Generation)
   * @param {(string|TypedData|Uint8Array)} input something to encrypt
   * @param {(string|TypedData|Uint8Array)} salt Random or Secure value with enough Entropy to encrypt
   * @param {boolean} toHex returns hex string instead of Uint8Array
   * @param {number} iterations Number of iterations to run the encryption {Default to 2048 for BIP39 spec}
   * @param {number} byteLength Will produce 64 bytes of Uint8Array
   * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} hashAlgorithm SHA to digest (Default to SHA-512 for BIP39 spec)
   * @returns {Uint8Array|TypedData} bytes of encrypted result
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/crypto.ts#L22} MIT LICENSE
   * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed}
   */
  const pbkdf2 = async (input, salt, toHex = false, iterations = 2048, byteLength = 64, hashAlgorithm = 'SHA-512') => {
    const baseKey = await crypto.subtle.importKey(
      'raw',
      toBytes(input, true),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const arrayBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: hashAlgorithm,
        salt: toBytes(salt, true),
        iterations
      },
      baseKey,
      byteLength * 8
    );

    return toHex ? bytesToHex(new Uint8Array(arrayBuffer)) : new Uint8Array(arrayBuffer);
  };

  /**
   * Convert ArrayBuffer to Base64 string
   * @param {Uint8Array} buff Uint8Array buffer
   * @returns {string} Base64 encoded string
   * @see {@link https://bradyjoslin.com/blog/encryption-webcrypto/}
   */
  const buff_to_base64 = (buff) => btoa(String.fromCharCode.apply(null, buff));

  /**
   * Convert Base64 string to ArrayBuffer
   * @param {string} b64 Base64 encoded text string
   * @returns {Uint8Array} Buffer encoded value
   * @see {@link https://bradyjoslin.com/blog/encryption-webcrypto/}
   */
  const base64_to_buf = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

  /**
   * Get the Cipher key and IV for PBKDF2 encryption
   * @param {Object} inputParams Input params to get key and iv value for PBKDF2 encryption
   * @param {Uint8Array} inputParams.salt Salt array to use for encryption
   * @param {string} inputParams.password Password to use for encryption
   * @param {string} inputParams.hash SHA algorithm supported
   * @param {number} inputParams.iterations Number of iterations to make secure value
   * @param {string} inputParams.cipher Cipher algorithm supported
   * @param {number} inputParams.cipherLength Length of cipher key
   * @returns {Object} returns Return an object with a key and iv
   * @returns {Object} returns.key CryptoKey Object (https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey)
   * @returns {Uint8Array} returns.iv IV value
   * @see {@link https://gist.github.com/ayosec/d4dc24fb8f0965703c023f92b8e9cdf3}
   */
  const getKeyAndIv = async (
    salt,
    password,
    hash = 'SHA-512',
    iterations = 10000,
    cipher = 'AES-CBC',
    cipherLength = 256
  ) => {
    const enc = new TextEncoder().encode(password);
    const basekey = await crypto.subtle.importKey('raw', enc, 'PBKDF2', false, ['deriveBits']);

    const keys = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash,
        salt,
        iterations
      },
      basekey,
      cipherLength /* key */ + 128 /* iv */
    );

    const iv = new Uint8Array(keys.slice(cipherLength / 8));
    const key = await crypto.subtle.importKey(
      'raw',
      new Uint8Array(keys.slice(0, cipherLength / 8)),
      cipher,
      false,
      ['encrypt', 'decrypt']
    );

    return { key, iv };
  };

  /**
   * Encrypt string with PBKDF2 and return Base64 encoded string value
   * Uses SHA-512 and AES-256-CBC with 10000 iterations to match with the following OpenSSL command
   * openssl enc -e -aes-256-cbc -pbkdf2 -salt -A -a --md sha512 --iter 10000 --in input.txt -pass file:pass.txt
   * input.txt as text to encrypt, pass.txt for encrypt pass, enc.txt for encrypted text to decode
   * @param {string} plainString String value to encrypt with password
   * @param {string} password String password to encrypt plainString value
   * @param {Uint8Array} saltArray Input your custom salt to create a deterministic result
   * @param {string} hash SHA algorithm supported
   * @param {number} iterations Number of iterations to make secure value
   * @param {string} cipher Cipher algorithm supported
   * @param {number} cipherLength Length of cipher key
   * @param {number} saltSize Length of the salt value
   * @returns {string} Base64 encoded encrypted string value
   */
  const encryptString = async (
    plainString,
    password,
    saltArray,
    hash = 'SHA-512',
    iterations = 10000,
    cipher = 'AES-CBC',
    cipherLength,
    saltSize = 8
  ) => {
    const salt = saltArray ?? getRandomBytes(saltSize);

    const aesKey = await getKeyAndIv(
      salt,
      password,
      hash,
      iterations,
      cipher,
      cipherLength
    );

    const iv = aesKey.iv;

    const cipherBuffer = await crypto.subtle.encrypt(
      {
        name: cipher,
        iv
      },
      aesKey.key,
      new TextEncoder().encode(plainString)
    );

    const cipherTextArr = new Uint8Array(cipherBuffer);

    const prefix = toBytes('Salted__', true);

    let buff = new Uint8Array(
      prefix.byteLength + salt.byteLength + cipherTextArr.byteLength
    );
    buff.set(prefix, 0);
    buff.set(salt, prefix.byteLength);
    buff.set(cipherTextArr, prefix.byteLength + salt.byteLength);

    return buff_to_base64(buff);
  };

  /**
   * Decrypt Base64 encrypted string with PBKDF2
   * Uses SHA-512 and AES-256-CBC with 10000 iterations to match with the following OpenSSL command
   * openssl enc -e -aes-256-cbc -pbkdf2 -d -a --md sha512 --iter 10000 --in enc.txt -pass file:pass.txt
   * input.txt as text to encrypt, pass.txt for encrypt pass, enc.txt for encrypted text to decode
   * @param {string} encryptedString Base64 encoded encrypted string
   * @param {string} password Plain password string to use for decryption
   * @param {string} hash SHA algorithm supported
   * @param {number} iterations Number of iterations to make secure value
   * @param {string} cipher Cipher algorithm supported
   * @param {number} cipherLength Length of cipher key
   * @param {number} saltSize Length of the salt value
   * @returns {string} Decrypted plain string
   */
  const decryptString = async (
    encryptedString,
    password,
    hash = 'SHA-512',
    iterations = 10000,
    cipher = 'AES-CBC',
    cipherLength,
    saltSize = 8
  ) => {
  // 1. Separate ciphertext, salt, and iv
    const encryptedArray = base64_to_buf(encryptedString);
    // Salted__ prefix
    const prefixLength = 8;
    // 8 bytes salt: 0x0123456789ABCDEF
    const saltLength = prefixLength + saltSize; // 16
    // Prefix
    const prefix = encryptedArray.slice(0, prefixLength);
    // Salt and IV
    const salt = encryptedArray.slice(prefixLength, saltLength);
    // ciphertext
    const data = encryptedArray.slice(saltLength);

    if (new TextDecoder().decode(prefix) !== 'Salted__') {
      throw new Error('Encrypted data not salted?');
    }

    // 2. Determine key using PBKDF2
    const aesKey = await getKeyAndIv(
      salt,
      password,
      hash,
      iterations,
      cipher,
      cipherLength
    );

    try {
      const decryptedContent = await crypto.subtle.decrypt(
        {
          name: cipher,
          iv: aesKey.iv
        },
        aesKey.key,
        data
      );

      return new TextDecoder().decode(decryptedContent);
    } catch (e) {
      // e.message is blank when the password or data is incorrect and thus we create our new custom error message
      if (!e.message) {
        throw new Error('Failed to decrypt with blank error, make sure you have the correct data / password');
      }
      throw e;
    }
  };

  /**
   * Create a secure 512 bits (= 64 bytes) hex string (or a big random number)
   * based on a combination of id (or an email), password,
   * and any string parameters given (like password recovery questions)
   * @param {string} id ID or an Email address to use to generate a hex
   * @param {string} pass Password to use to generate hex
   * @param {string[]} third Additional string array to use to generate hex
   * @param {number} nonce Nonce to differ hex using the same params
   * @returns {TypedData} 128 length ( = 512 bits (= 64 bytes) ) of the deterministic and secure hex string
   * @see {@link https://github.com/OutCast3k/coinbin/blob/cda4559cfd5948dbb18dc078c48a3e62121218e5/js/coinbin.js#L15}
   */
  const generateHexWithIdV1 = async (id, pass, third, nonce = 0) => {
    const timeStart = Date.now();
    showConsole(CONSOLE_LINEBREAK, () => CONSOLE_LINEBREAK);
    showConsole('FUNCTION', () => 'generateHexWithIdV1');

    // Validate input params
    if (
      // Validate id and pass input
      !id ||
      !pass ||
      typeof id !== 'string' ||
      typeof pass !== 'string' ||
      id.length < 5 ||
      pass.length < 8 ||
      // If third is not undefined check if it is a valid array
      !(
        typeof third === 'undefined' ||
        (
          typeof third === 'object' &&
          Array.isArray(third) &&
          third.length !== 0
        )
      ) ||
      typeof nonce !== 'number'
    ) {
      throw new Error('generateHexWithIdV1: Invalid Params, make sure to input correct id and password');
    }

    let thirdLength = 0;

    // Normalize strings by NFKD
    id = id.normalize('NFKD');
    pass = pass.normalize('NFKD');
    if (typeof third === 'object' && Array.isArray(third) && third.length !== 0) {
      thirdLength = third.length;
      third = third
        .map(t => t.normalize('NFKD'))
        .join('|');
    }
    showConsole('ID', () => id);
    showConsole('Password', () => pass);
    showConsole('Third Factor', () => thirdLength ? third : 'undefined');

    // Try to create a secure string
    let s = id + '|';
    s += pass + '|';
    if (typeof third === 'string') {
      s += third + '|';
    }
    s += s.length + '|!@' + `${((pass.length * 7) + id.length + thirdLength) * 7}`;
    const regchars = (pass.match(/[a-z]+/g)) ? pass.match(/[a-z]+/g).length : 1;
    const regupchars = (pass.match(/[A-Z]+/g)) ? pass.match(/[A-Z]+/g).length : 1;
    const regnums = (pass.match(/[0-9]+/g)) ? pass.match(/[0-9]+/g).length : 1;
    s += `${((regnums + regchars) + regupchars + nonce) * pass.length}` + `${id.length}${pass.length}${thirdLength}${nonce}`;
    // Repeat string 3 times
    s += ('|' + s + '|' + s);
    showConsole('Secure String', () => s);

    /**
      For the record no longer being used

    if (!usePbkdf2) {
      // Hash string 50 times
      const hashedString = await repeatSha(s, 50 + nonce, true);

      return hashedString;
    }
    **/

    // Create Hashed Uint8Array String and Salt based on the secure string and nonce
    const [
      hashedHexString,
      saltHexString
    ] = await Promise.all([
      repeatSha(s, 10 + nonce, true),
      repeatSha(s.slice(0, Math.floor(s.length / 2)), 7 + nonce, true)
    ]);
    showConsole('Hashed String', () => hashedHexString.data);
    showConsole('Hashed Salt', () => saltHexString.data);
    showConsole('Time Spent (salt)', () => `${Date.now() - timeStart} ms`);

    const encryptedHexString = await pbkdf2(hashedHexString, saltHexString, true);
    showConsole('Encrypted Hex', () => encryptedHexString.data);
    showConsole('Time Spent (pbkdf2)', () => `${Date.now() - timeStart} ms`);

    // Hash string 50 times
    const hashedString = await repeatSha(encryptedHexString, 50 + nonce, true);
    showConsole('Hashed String', () => hashedString.data);
    showConsole('Time Spent (generateHexWithIdV1)', () => `${Date.now() - timeStart} ms`);

    return hashedString;
  };

  /**
   * Create a secure 512 bits (= 64 bytes) hex string (or a big random number)
   * based on a combination of id (or an email), password,
   * and any string parameters given (like password recovery questions)
   * @param {string} id ID or an Email address to use to generate a hex
   * @param {string} pass Password to use to generate hex
   * @param {string[]} third Additional string array to use to generate hex
   * @param {number} nonce Nonce to differ hex using the same params
   * @param {number} revision Revision of generateHexWithId function
   * @returns {TypedData} 128 length ( = 512 bits (= 64 bytes) ) of the deterministic and secure hex string
   * @see {@link https://github.com/OutCast3k/coinbin/blob/cda4559cfd5948dbb18dc078c48a3e62121218e5/js/coinbin.js#L15}
   */
  const generateHexWithId = (id, pass, third, nonce, revision) => {
    if (revision === 1) {
      return generateHexWithIdV1(id, pass, third, nonce);
    }

    // Default (Should be current revision)
    return generateHexWithIdV1(id, pass, third, nonce);
  };

  /**
   * Get checksum bits from Uint8Array entropy (BIP39 Standard)
   * @param {Uint8Array} entropy Entropy in Uint8Array
   * @returns {string} BIP39 Checksum in the binary string
   * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic}
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/index.ts#L58}
   */
  const deriveChecksumBits = async (entropy) => {
    const ENT = entropy.length * 8;
    const CS = ENT / 32;
    const hash = await sha(entropy, undefined, undefined, 'SHA-256');
    return bytesToBin(hash).data.slice(0, CS);
  };

  // Is japanese wordlist
  const isJapanese = (wordlist) => wordlist[0] === '\u3042\u3044\u3053\u304f\u3057\u3093';

  /**
   * Validates and load wordlist from globalThis
   * @returns {string[]} BIP39 wordlist
   */
  const loadWordlist = () => {
    const wordlist = globalThis.wordlist ?? DEFAULT_WORDLIST;
    // Validate wordlist
    if (!(typeof wordlist === 'object' && Array.isArray(wordlist) && wordlist.length === 2048)) {
      throw new Error('Invalid wordlist');
    }
    return wordlist;
  };

  /**
   * Checks if bytes are valid entropy for BIP39
   * @param {Uint8Array} entropy Entropy used for BIP39 mnemonic generation
   */
  const checkEntropy = (entropy) => {
    if (!(
      typeof entropy === 'object' &&
      entropy instanceof Uint8Array &&
      entropy.length !== 0 &&
      entropy.length % 4 === 0
    )) {
      throw new Error('Invalid entropy');
    }
  };

  /**
   * Checks if mnemonicLength are valid value
   * @param {number} mnemonicLength Length for desired BIP39 mnemonic words
   */
  const checkMnemonicLength = (mnemonicLength) => {
    if (!(
      mnemonicLength !== 0 &&
      mnemonicLength % 3 === 0
    )) {
      throw new Error('Invalid mnemonicLength, it should be a multiplier of three');
    }
  };

  /**
   * Converts raw entropy in the form of a byte array to mnemonic string.
   * @param {Uint8Array} entropy Entropy in Uint8Array
   * @returns {string} Checksummed mnemonic words
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/index.ts#L125}
   */
  const bytesToMnemonic = async (entropy) => {
    const wordlist = loadWordlist();
    // Validate entropy
    checkEntropy(entropy);
    const { data: entropyBinary } = bytesToBin(entropy);
    const checksumBits = await deriveChecksumBits(entropy);
    const bits = entropyBinary + checksumBits;
    const chunks = bits.match(/(.{1,11})/g);
    const words = chunks.map((binary) => {
      return wordlist[parseInt(binary, 2)];
    });
    return words.join(isJapanese(wordlist) ? '\u3000' : ' ');
  };

  /**
   * Converts are given entropy (hex, binary, bytes) to BIP39 mnemonic words string.
   * @param {(string|TypedData|Uint8Array)} entropy Entropy in Hex / Binary String or Uint8Array
   * @param {number} mnemonicLength Length of mnemonic words desired
   * (will use https://github.com/iancoleman/bip39/blob/0.5.4/src/js/index.js#L1887 to generate custom length words)
   * @returns {Object} return Object containing finalEntropy and mnemonic words
   * @returns {TypedData} return.finalEntropy Hex-typed entropy generated from entropy input (from BIP39 specification)
   * @returns {string} return.mnemonic BIP39 mnemonic words generated from return.finalEntropy
   * @see {@link https://github.com/iancoleman/bip39/blob/0.5.4/src/js/index.js#L1885}
   */
  const entropyToMnemonic = async (entropy, mnemonicLength) => {
    // Deal binary string with blanks
    if (typeof entropy === 'string' && entropy.includes(' ')) {
      entropy = entropy.replace(/\s/g,'');
    }

    // Uint8Array
    let bits = toBytes(entropy);

    // https://github.com/iancoleman/bip39/blob/0.5.4/src/js/index.js#L1887
    if (mnemonicLength) {
      mnemonicLength = parseInt(mnemonicLength);
      // Validate mnemonic
      checkMnemonicLength(mnemonicLength);
      // Get bits by hashing entropy with SHA256 (Enforce hashing SHA from the string as well since some BIP39 generator does this)
      // sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash('2676e8ac62a7061636ba90e7342ccca470258829b5f66b5cc03d8ec0bc691a09'))
      const shaHex = await sha(bytesToHex(bits), undefined, true, 'SHA-256');
      // Binary String
      let bins = bytesToBin(shaHex).data;

      while (bins.length % 256 != 0) {
        bins = '0' + bins;
      }

      // Truncate the hash to suit a number of words
      const numberOfBins = 32 * parseInt(mnemonicLength) / 3;
      bins = bins.substring(0, numberOfBins);
      bits = toBytes(bins);
    }

    return {
      finalEntropy: bytesToHex(bits),
      mnemonic: await bytesToMnemonic(bits)
    };
  };

  /**
   * Create Cryptographically Secure Random BIP39 mnemonic words
   * @param {number} mnemonicLength Length of BIP39 mnemonic words to generate
   * @returns {Object} return An object that contains generated entropy, mnemonic, and some informal data
   * @returns {TypedData} return.entropy Generated entropy hex in TypedData format (considered deterministic and secure)
   * @returns {string} return.mnemonic BIP39 mnemonic words generated from return.entropy
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/index.ts#L47}
   * @see {@link https://github.com/iancoleman/bip39/blob/master/src/js/index.js#L673}
   */
  const generateMnemonic = async (mnemonicLength = 24) => {
    mnemonicLength = parseInt(mnemonicLength);
    // Validate mnemonic
    checkMnemonicLength(mnemonicLength);
    const strength = mnemonicLength / 3 * 32;
    const randomBytes = getRandomBytes(strength / 8);
    const { finalEntropy: entropy, mnemonic } = await entropyToMnemonic(randomBytes);

    return {
      entropy,
      mnemonic
    };
  };

  /**
   * Create secure BIP39 seed words (Mnemonic)
   * based on a combination of id (or an email), password,
   * and any string parameters given (like password recovery questions)
   * @param {string} id ID or an Email address to use to generate a hex
   * @param {string} pass Password to use to generate hex
   * @param {string[]} third Additional string array to use to generate hex
   * @param {number} mnemonicLength Length of mnemonic words desired
   * @param {number} nonce Nonce to differ entropy using the same params
   * @param {number} revision Revision of the function should return a hex that is deterministic by each revision
   * @returns {Object} return An object that contains generated entropy, mnemonic, and some informal data
   * @returns {TypedData} return.entropy Generated entropy hex in TypedData format (considered deterministic and secure)
   * @returns {TypedData} return.finalEntropy New entropy from return.entropy to match with mnemonicLength (according to BIP39 spec)
   * @returns {string} return.mnemonic BIP39 mnemonic words generated from return.finalEntropy
   * @returns {TypedData} return.entropy2 Generated entropy hex in TypedData format (considered deterministic and secure)
   * @returns {TypedData} return.finalEntropy2 New entropy from return.entropy2 to match with mnemonicLength (according to BIP39 spec)
   * @returns {string} return.mnemonic2 BIP39 mnemonic words generated from return.finalEntropy2
   * @returns {number} return.revision The current revision of generateHexWithId function
   * @returns {number} return.timeSpent Time spent to generate entropy and mnemonic in milliseconds
   * @see {@link https://github.com/OutCast3k/coinbin/blob/cda4559cfd5948dbb18dc078c48a3e62121218e5/js/coinbin.js#L15}
   */
  const generateMnemonicWithId = async (id, pass, third, mnemonicLength, nonce, revision = REVISION) => {
    // Examine time
    const timeStart = new Date().getTime();

    // Get 128 lengths of secure numbers generated from the id
    const hex = await generateHexWithId(id, pass, third, nonce, revision);
    showConsole(CONSOLE_LINEBREAK, () => CONSOLE_LINEBREAK);
    showConsole('FUNCTION', () => 'generateMnemonicWithId');

    // If the length of the hex is 128 (using SHA-512 algo), parse the second entropy as well
    const prefixLength = 2;
    if (hex.data.length === prefixLength + 128) {
      const entropy = new TypedData(hex.data.slice(prefixLength, prefixLength + 64), 'hex');
      const entropy2 = new TypedData(hex.data.slice(prefixLength + 64), 'hex');

      const [
        { finalEntropy, mnemonic },
        { finalEntropy: finalEntropy2, mnemonic: mnemonic2 }
      ] = await Promise.all([
        entropyToMnemonic(entropy, mnemonicLength),
        entropyToMnemonic(entropy2, mnemonicLength),
      ]);
      showConsole('Revision', () => revision);
      showConsole('Entropy 1', () => entropy.data);
      showConsole('Final Entropy 1', () => finalEntropy.data);
      showConsole(`Mnemonic 1 (${mnemonic.split(' ').length} words)`, () => mnemonic);
      showConsole('Entropy 2', () => entropy2.data);
      showConsole('Final Entropy 2', () => finalEntropy2.data);
      showConsole(`Mnemonic 2 (${mnemonic2.split(' ').length} words)`, () => mnemonic2);
      showConsole('Time Spent (generateMnemonicWithId)', () => `${new Date().getTime() - timeStart} ms`);

      return {
        entropy,
        finalEntropy,
        mnemonic,
        entropy2,
        finalEntropy2,
        mnemonic2,
        revision,
        timeSpent: new Date().getTime() - timeStart
      };
    }

    const {
      finalEntropy,
      mnemonic
    } = await entropyToMnemonic(hex, mnemonicLength);
    showConsole('Revision', () => revision);
    showConsole('Entropy 1', () => hex.data);
    showConsole('Final Entropy 1', () => finalEntropy.data);
    showConsole(`Mnemonic 1 (${mnemonic.split(' ').length} words)`, () => mnemonic);
    showConsole('Time Spent (generateMnemonicWithId)', () => `${new Date().getTime() - timeStart} ms`);

    return {
      entropy: hex,
      finalEntropy,
      mnemonic,
      revision,
      timeSpent: new Date().getTime() - timeStart
    };
  };

  /**
   * Converts a mnemonic string to raw entropy in the form of the byte array.
   * @param {string} mnemonic BIP39 mnemonic words
   * @returns {TypedData} Entropy in Hex String
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/index.ts#L79}
   */
  const mnemonicToEntropy = async (mnemonic) => {
    if (!mnemonic || typeof mnemonic !== 'string') {
      throw new Error('Invalid mnemonic type');
    }

    const words = mnemonic.normalize('NFKD').split(' ');
    // Validate mnemonic
    checkMnemonicLength(words.length);

    const wordlist = loadWordlist();
    // convert word indices to 11-bit binary strings
    const bits = words
      .map((word) => {
        const index = wordlist.indexOf(word);
        if (index === -1) {
          const errMsg = `Invalid mnemonic, could not find ${word} from the given wordlist`;
          throw new Error(errMsg);
        }
        return index.toString(2).padStart(11, '0');
      })
      .join('');
    // split the binary string into ENT/CS
    const dividerIndex = Math.floor(bits.length / 33) * 32;
    const entropyBits = bits.slice(0, dividerIndex);
    const checksumBits = bits.slice(dividerIndex);
    // calculate the checksum and compare
    const entropy = binToBytes(entropyBits);
    // Validate entropy
    checkEntropy(entropy);
    const newChecksum = await deriveChecksumBits(entropy);
    if (newChecksum !== checksumBits) {
      throw new Error('Invalid checksum');
    }
    return bytesToHex(entropy);
  };

  /**
   * Uses PBKDF2 to derive 64 bytes of key data from mnemonic + optional password.
   * @param mnemonic BIP39 mnemonic words
   * @param passphrase a string that will additionally protect the key
   * @returns {TypedData} BIP39 seed in hex string
   * @see {@link https://github.com/hujiulong/web-bip39/blob/v0.0.2/src/index.ts#L162}
   */
  const mnemonicToBIP39Seed = async (mnemonic, passphrase) => {
    if (
      !mnemonic ||
      typeof mnemonic !== 'string' ||
      !(
        typeof passphrase === 'undefined' ||
        (
          typeof passphrase === 'string' &&
          passphrase.length !== 0
        )
      )
    ) {
      throw new Error('Invalid input params');
    }

    mnemonic = mnemonic.normalize('NFKD');
    passphrase = passphrase ? `mnemonic${passphrase}`.normalize('NFKD') : 'mnemonic';

    return await pbkdf2(mnemonic, passphrase, true);
  };

  return {
    utils: {
      crypto,
      showConsole,
    },
    numberUtils: {
      numToString,
      isNum,
      isHex,
      isHexFormatted,
      formatHex,
      isBin,
      formatBin,
      StringType,
      TypedData,
      matchers,
      classifyInput,
      binToBytes,
      hexToBytes,
      numToBytes,
      toBytes,
      bytesToHex,
      bytesToBin,
      bytesToNum,
      bytesToString,
      buff_to_base64,
      base64_to_buf,
    },
    crypto: {
      getRandomBytes,
      sha,
      repeatSha,
      pbkdf2,
      getKeyAndIv,
      encryptString,
      decryptString,
    },
    bip39: {
      deriveChecksumBits,
      isJapanese,
      generateMnemonic,
      bytesToMnemonic,
      entropyToMnemonic,
      mnemonicToEntropy,
      mnemonicToBIP39Seed,
    },
    REVISION,
    generateHexWithId,
    generateMnemonicWithId,
  };
})();

// Export for Browser
if (typeof globalThis.window !== 'undefined') {
  window.bip39Org = bip39Org;
}

// Export for node modules and testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = bip39Org;
}

/**
Test codes

let startTest = async () => {
  const { generateMnemonicWithId } = bip39Org;

  console.log('----------------------------------------------------------\n');

  console.time('Testing Raw Latency (Without CPU caching):');
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1');
  console.timeEnd('Testing Raw Latency (Without CPU caching):')

  console.log('\n----------------------------------------------------------');

  globalThis.isDebug = true;

  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1');
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', ['this is recovery phrase']);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', ['this is recovery phrase', 'this is the second one']);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 12);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 15);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 18);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 21);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 24);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 1);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 2);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 5);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 10);

  globalThis.isDebug = false;
}
startTest();
**/
