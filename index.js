window.onload=function(){
  function receiveMessage(e){
    console.log('received message');
    var origin = event.origin || event.originalEvent.origin; 
    e.source.postMessage({'origin':origin,'message':pubKey},"*");
  }

	window.addEventListener('message',receiveMessage);
}

var pubKey = "Test";

const getPublicKey = async () => {
  const options = {
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength: 2048, 
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: { name: 'SHA-256' }, 
  };

  const keys = await window.crypto.subtle.generateKey(
    options,
    false, // non-exportable (public key still exportable)
    ['sign', 'verify'],
  );

  const publicKey = await window.crypto.subtle.exportKey('jwk', keys.publicKey);

  return `${JSON.stringify(publicKey)}`;
};

getPublicKey().then(value => { pubKey = value });