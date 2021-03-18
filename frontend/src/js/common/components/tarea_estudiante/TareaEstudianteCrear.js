/**Modulo donde se podra subir las tareas que los alumnos 
 * tengan asignados
 */
import React, {Component} from "react"
import TareaEstudianteForm from "./TareaEstudianteForm"

class TareaEstudianteCrear extends Component{
    state = {
        id_tarea: null,
        id_asignacion: null,
        titulo: "Subir",
        archivo:null
    }
    componentDidMount(){
        const {match, leerTarea} = this.props
        this.setState({
            id_tarea:match.params.id_tarea,
            id_asignacion:match.params.id_asignacion
        })
        leerTarea(match.params.id_tarea)
    }
    setArchivo = (archivo) => {
        this.setState({ archivo: archivo });
    };

    crear = (data) => {
        const { crear } = this.props;
        const id_tarea = this.state.id_tarea;
        const id_asignacion = this.state.id_asignacion;
        crear({ ...data, archivo: null, tarea: id_tarea, id_asignacion:id_asignacion }, [
            { file: this.state.archivo, name: "archivo" },
        ]);

    };
    render(){
        const {infoTarea, loader} = this.props
        const funcionEnvio = this.crear
        return(
            <div className="container mt-3">
                <h4>Tarea: {infoTarea.titulo}</h4>
                <p className="mb-0">{infoTarea.descripcion}</p>
                <p>Punteo: {infoTarea.nota} puntos</p>
                <TareaEstudianteForm 
                    id_asignacion={this.state.id_asignacion}
                    titulo ={this.state.titulo}
                    setArchivo={this.setArchivo}
                    onSubmit={funcionEnvio}
                    permitirArchivo = {infoTarea.permitir_archivo}
                    loader={loader}
                />
            </div>
        )
    }
}

export default TareaEstudianteCrear