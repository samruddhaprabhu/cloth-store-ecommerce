import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

const Directory = ({categories}) => {
    
    return (
        <div className='categories-container'>   
            {categories.map(({id, ...otherProps}) => (
               <CategoryItem key={id} {...otherProps} />
            ))}
        </div>
    );
    
}

export default Directory;