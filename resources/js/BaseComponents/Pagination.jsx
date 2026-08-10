import { Link } from "@inertiajs/react";


export default function Pagination({ links }) {

    return (
        <div className="pagination">
            {links.length > 3 && links.map((link, index) =>

            (link.url && (
                <Link
                    key={index}
                    href={link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`page-link ${link.active ? 'active' : ''}`}
                />
            )
            ))}
        </div>
    )
}