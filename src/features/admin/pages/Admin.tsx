import { MoviesTable } from '../../../components/MoviesTable'
import { ReviewsTable } from '../../../components/ReviewsTable'

export const Admin = () => {
  
  return (
    <>
    <h1>Cine Log Admin Panel</h1>
    <button>MOVIES</button>
    <button>REVIEWS?</button>
    <MoviesTable/>
    <ReviewsTable/>

    </>
    
  )
}
