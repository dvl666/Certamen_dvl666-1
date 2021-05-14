tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});
const tipo = ["Desayuno","Almuerzo","Once","Cena"];
let select = document.querySelector("#tipo-select");
for(let i=0; i<tipo.length; ++i){
    const option = document.createElement('option');
    option.value=tipo[i];
    option.text=tipo[i];
    select.appendChild(option);
}


const ordenes = []
const CargarTabla =() =>{ 
    let tbody = document.querySelector("#tabla-tbody")
    tbody.innerHTML="";
    for(let x = 0; x < ordenes.length; ++x){
        let o = ordenes[x]
        let tr = document.createElement("tr")
        let tdNombre = document.createElement("td")
        tdNombre.innerText = o.nombre
        let tdHor = document.createElement("td")
        tdHor.innerText = o.tipo
        let tdValor = document.createElement("td")
        tdValor.innerText = o.valor
        let tdDes = document.createElement("td")
        tdDes.innerHTML = o.descripcion
        let tdOfer = document.createElement("td")
        let icono = document.createElement("i")
        tdOfer.innerText = o.oferta
        tr.appendChild(tdNombre)
        tr.appendChild(tdHor)
        tr.appendChild(tdValor)
        tr.appendChild(tdDes)
        tr.appendChild(tdOfer)

        tbody.appendChild(tr)
    
    }

}
document.querySelector("#registrar-btn").addEventListener("click", ()=>{
  let error = "no"
  let oferta = "no"
  let nombre = document.querySelector("#nombre-txt").value;
  let tipo = document.querySelector("#tipo-select").value;
  let descripcion = tinymce.get("descripcion-txt").getContent();
  let valor = document.querySelector("#valor-txt").value
    if( tipo == "Desayuno" && valor < 1000)
        error = "si"
    if( tipo == "Desayuno" && valor > 10000)  
        error = "si"
    if( tipo == "Almuerzo" && valor < 10000)
        error = "si"
    if( tipo == "Almuerzo" && valor > 20000)
        error = "si"
    if( tipo == "Once" && valor < 5000)
        error = "si"
    if( tipo == "Once" && valor > 15000)
        error = "si"
    if( tipo == "Cena" && valor > 15000)
        error = "si"
    if( tipo == "Desayuno" && valor < 5000)
        oferta = "si"
    if( tipo == "Almuerzo" && valor <15000)
        oferta = "si"
    if(tipo == "Once" && valor < 10000)
        oferta = "si"
    if(tipo == "Cena" && valor < 20000)
        oferta = "si"
    let orden = {};
    orden.nombre = nombre;
    orden.descripcion = descripcion;
    orden.tipo = tipo;
    orden.valor = valor;
    orden.oferta = oferta;
    if(error == "no")
        ordenes.push(orden);
        CargarTabla();
        Swal.fire("Exito!","Orden registrada", "info");
        
    if(error == "si")
        swal.fire("Error!","A ocurrido un error","error");      
})