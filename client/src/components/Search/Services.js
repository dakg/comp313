import axios from 'axios';
 
class LaptopService {

    deleteProduct(id) { 
        axios.delete('http://localhost:5000/api/laptops/deleteProduct/' + id)
            .then(() => {
                console.log('Product successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
}

export default LaptopService;