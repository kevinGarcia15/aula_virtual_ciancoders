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
        const {match} = this.props
        this.setState({
            id_tarea:match.params.id_tarea,
            id_asignacion:match.params.id_asignacion
        })
    }
    setArchivo = (archivo) => {
        this.setState({ archivo: archivo });
    };
    
    crear = (data) => {
        //const { crear } = this.props;
        const id_tarea = this.state.id_tarea;
        /*crear({ ...data, archivo: null, asignacion: id_asignacion }, [
            { file: this.state.archivo, name: "archivo" },
        ]);*/
        console.log(data)
        console.log(this.state.archivo)
    };
    render(){
        const funcionEnvio = this.crear
        return(
            <div className="container mt-3">
                <TareaEstudianteForm 
                    id_asignacion={this.state.id_asignacion}
                    titulo ={this.state.titulo}
                    setArchivo={this.setArchivo}
                    onSubmit={funcionEnvio}
                />
            </div>
        )
    }
}

export default TareaEstudianteCrear