import styles from './styles.module.scss';
// icon匯入
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faLeaf } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading_loadingBlock}>
        <div className={styles.loadingBlock_icon}>
          <FontAwesomeIcon
            className={styles.loadingBlock_icon__outer}
            icon={faCertificate}
            spin
          />
          <FontAwesomeIcon
            className={styles.loadingBlock_icon__center}
            icon={faLeaf}
          />
        </div>
        <p className={styles.loadingBlock_text}>Loading . . .</p>
      </div>
    </div>
  );
};

export default Loading;
