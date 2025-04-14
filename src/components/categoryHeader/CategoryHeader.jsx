import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function CategoryHeader({ list, categoryType, pathName }) {
    const headerCategory = useRef();
    let lastScroll = useRef(0);

    const handleWindowOnscroll = () => {
        if (lastScroll > window.scrollY) {
            headerCategory.current.style.top = '0px';
        } else if (window.scrollY >= 70) {
            headerCategory.current.style.top = '-70px';
        } else if (window.scrollY === 0) {
            headerCategory.current.style.top = '0';
        }
        lastScroll = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleWindowOnscroll);
        return () => window.removeEventListener('scroll', handleWindowOnscroll);
    }, []);

    return (
        <div ref={headerCategory} className='categoryHeader__wrapper'>
        {list.map((item, index) => {
            const classItem = categoryType === item.type ? 'category-item active' : 'category-item';

            return (
                <Link
                    to={`${pathName}?status=${item.type}`}
                    key={index}
                    className={classItem}
                >
                    {item.type}
                </Link>
            );
        },)}
</div>
    );
}

export default CategoryHeader;
