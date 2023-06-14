const Tarea = require("./tarea");

class Tareas {
  get listadoArr(){ 
    const listado = [];

    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if ( this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach( (tarea, i) => {
      const idx = `${i + 1}`.green;
      const {desc, completadoEn} = tarea;
      const estado = (completadoEn)
                      ? 'Completada'.green
                      : 'Pendiente'.brightYellow;
      console.log(`${idx} ${desc}: ${estado}`);
    })
  }

  listarPendientesCompletadas( completadas = true ) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach( (tarea, i) => {

      const {desc, completadoEn} = tarea;
      const estado = (completadoEn)
                      ? 'Completada'.green
                      : 'Pendiente'.brightYellow;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(`${(contador + '.').green} ${desc.bold.strikethrough}: ${estado.red}/${completadoEn.brightGreen}`);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + '.').green} ${desc.bold}: ${estado}`);
        }
      }
    })
  }

  toggleCompletadas(ids = []) {

    ids.forEach(id => {
      const tarea = this._listado[id];
      if ( !tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    })

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;