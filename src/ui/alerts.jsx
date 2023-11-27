import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const myAlerta =(status,title,msg,form) => {
    MySwal.fire({
      title: <p>{title}</p>,
      html: <i>{msg}</i>,
      icon: status ? 'success' : 'error' 
    }).then((result) =>
    {if(result.isConfirmed){
      if(form && status){
        window.location.reload(false);
      }
    } 
    }      
    )
} 