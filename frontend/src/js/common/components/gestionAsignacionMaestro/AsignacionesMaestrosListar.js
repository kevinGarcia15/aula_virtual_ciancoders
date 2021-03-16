import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class AsignacionesMaestrosListar extends Component{
    componentDidMount(){
        const {listar} = this.props
        listar()
    }

    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
            <div className="d-flex justify-content-center mt-3">
                <h4>Asignaciones</h4>
            </div>
            <Link to="/asignacion/crear" className="btn btn-primary mt-4 mb-4 ml-2">
                    Nueva asignacion 
                </Link>
            <Grid
                hover
                striped
                data={data}
                loading={loader}
                //onPageChange={this.onPageChange}
                //onSortChange={onSortChange}
            >
                <TableHeaderColumn isKey dataField="curso" dataSort>
                    Curso
                </TableHeaderColumn>
                <TableHeaderColumn dataField="grado" dataSort>
                    Grado
                </TableHeaderColumn>
                <TableHeaderColumn dataField="seccion" dataSort>
                    Seccion
                </TableHeaderColumn>
                <TableHeaderColumn dataField="maestro" dataSort
                    dataFormat={(cell)=>{
                        return `${cell.maestro_profile.user.first_name} ${cell.maestro_profile.user.last_name}`
                    }}
                >
                    Catedratico responsable
                </TableHeaderColumn>
                <TableHeaderColumn dataField="maestro" dataSort
                    dataFormat={(cell)=>{
                        return `${cell.maestro_profile.phone}`
                    }}
                >
                    Contacto
                </TableHeaderColumn>
            </Grid>
        </React.Fragment>        
        )
    }
}

export default AsignacionesMaestrosListar