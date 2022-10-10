import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, admin=false, searchWord='' }) => {
  return pages > 1 && (
    <Pagination>
        {page <= 1 ? (
            <LinkContainer to={admin ? `/admin/productlist/page/${page - 1}` : searchWord ? `/search/${searchWord}/page/${page - 1}` : `/page/${page - 1}`}>
                <Pagination.Prev disabled />
            </LinkContainer>
        ) : (
            <LinkContainer to={admin ? `/admin/productlist/page/${page - 1}` : searchWord ? `/search/${searchWord}/page/${page - 1}` : `/page/${page - 1}`}>
                <Pagination.Prev />
            </LinkContainer>
        )}
        
        {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1} to={admin ? `/admin/productlist/page/${x + 1}` : searchWord ? `/search/${searchWord}/page/${x + 1}` : `/page/${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
        ))}

         {page >= [...Array(pages).keys()].length ? (
            <LinkContainer to={admin ? `/admin/productlist/page/${page + 1}` : searchWord ? `/search/${searchWord}/page/${page + 1}` : `/page/${page + 1}`}>
                <Pagination.Next disabled />
            </LinkContainer>
        ) : (
            <LinkContainer to={admin ? `/admin/productlist/page/${page + 1}` : searchWord ? `/search/${searchWord}/page/${page + 1}` : `/page/${page + 1}`}>
                <Pagination.Next />
            </LinkContainer>
        )}
    </Pagination>
  )
}

export default Paginate