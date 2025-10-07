import styles from './breadcrumbs.module.css';
import { buttonIcons } from '../../../../pages/productsGroupsPages/shared';
import { Link } from "react-router-dom";

const Breadcrumbs = ({ config, actions }) => {

    return (
        <div className={styles.breadcrumbs}>
            {config && config.map((i, id) => {
                if (i.slug) {
                    return (
                        <Link
                            key={id}
                            className={styles.breadcrumbs__link}
                            to={i.slug}
                            title={i.name}
                        >
                            {i.name}
                            <span styles={styles.breadcrumbs__separator}>/</span>
                        </Link>
                    );
                } else {
                    return (
                        <p
                            className={styles.breadcrumbs__endOfTheLine}
                            key={id}
                            title={i.name}
                        >
                            {i.name}
                        </p>
                    );
                }

            })}
            {actions &&
                <div className={styles.breadcrumbs__actionsWrapper}>
                    {actions.map((a, id) => {

                        return (
                           <button className={styles.breadcrumbs__actionButton} onClick={a.action} key={id}>
                                {buttonIcons[a.type]}
                           </button>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default Breadcrumbs;
