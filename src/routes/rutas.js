          const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin')
var serviceAccount = require("../../crud-8c16c-firebase-adminsdk-1c70g-b1afe23456.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://crud-8c16c-default-rtdb.firebaseio.com/'
})

const db = admin.database();


//base
router.get('/', (req,res)=>{
    db.ref('heroes').once('value', (snapshot)=>{
        const base = snapshot.val()
        res.render('index',{heroes: base})
    })
    
})
//añadir
router.post('/new', (req, res)=>{
console.log(req.body)

const newHero={
    nombre:req.body.nombre,
    rol:req.body.rol,
    habilidades:req.body.perks,
    ultimate: req.body.ulti 
}
if(newHero.nombre ==""){
res.redirect('/')
}else{
    db.ref('heroes').push(newHero)
    res.redirect('/')
}
})
//borrar
router.get('/borrar/:id', (req, res)=>{
    db.ref('heroes/'+req.params.id).remove();
    res.redirect('/')
    console.log("borrado")
})
/*
//editar
router.get("/edit/:id", async (req, res) => {
    const doc = await db.collection("heroes").doc(req.params.id).get();
    res.render("index", { heroes: { id: doc.id, ...doc.data() } });
  });
//actualizar
  router.post("/update/:id", async (req, res) => {
    const { nombre, rol, perks, ulti } = req.body;
    const { id } = req.params;
    await db
      .collection("heroes")
      .doc(id)
      .update({ nombre, rol, perks, ulti });
    res.redirect("/");
  });*/
module.exports = router;