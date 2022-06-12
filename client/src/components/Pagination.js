import React from 'react'

function Pagination({paginated, nextPage, previousPage, totalPages, currentpage}) {
    const pageNumbers = [];
    

    for( let i=1; i <= totalPages; i++){
        pageNumbers.push(i)
    }

  return (
    <div className='row'>
        
        { (currentpage === 1) ? null : (
            
            <button
                type='button'
                className='btn btn-info mr-1 mb-5 mt-3'
                onClick={previousPage}
            >
                &laquo; Previous
            </button>
            
        )}
        <ul>
        { pageNumbers &&
            pageNumbers.map( number => (
                <li key={number}>
                    <a onClick={() => paginated(number)}>{number}</a>
                </li>
            )) 
        
        
        }

        </ul>
        { (currentpage === totalPages) ? null : (
            
            <button
            type='button'
            className='btn btn-info mb-5 mt-3'
            onClick={nextPage}
          >
            Next &raquo;
          </button>
            
        )}

    

    </div>
  )
}

export default Pagination