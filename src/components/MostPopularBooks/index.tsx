import { IBook } from '@/app/explore/page'
import { AverageRating } from '../AverageRating'
import { Book } from '../Book'
import { Header } from './Header'

interface Props {
  top5Books: IBook[]
}

export function MostPopularBooks({ top5Books }: Props) {
  // function redirectToPageBook(bookId: string) {
  //   console.log(bookId)
  // }

  return (
    <div className="flex flex-col items-start gap-3">
      <Header />
      {top5Books.map((book) => (
        <div className="w-full max-w-[324px]" key={book.id}>
          <Book
            book={book}
            // onClick={() => redirectToPageBook(book.id)}
          >
            <AverageRating ratings={book.ratings} />
          </Book>
        </div>
      ))}
    </div>
  )
}
