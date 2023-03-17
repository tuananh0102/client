import className from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as SearchProper } from '~/components/Proper';
import ShoesItem from '~/components/ShoesItem';
import styles from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '~/hooks';
import * as request from '~/apiService/search';

const cx = className.bind(styles);

function Search() {
    const [typedInput, setTypedInput] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    const [show, setShow] = useState(true);
    const inputRef = useRef();

    const debounce = useDebounce(typedInput, 500);

    useEffect(() => {
        if (!debounce.trim()) {
            setResultSearch([]);
            return;
        }

        const fetchApi = async () => {
            const res = await request.searchName(debounce);
            setResultSearch(res);
        };

        fetchApi();
    }, [debounce]);

    return (
        <div>
            <Tippy
                visible={show && resultSearch.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <SearchProper>
                            {resultSearch.map((item) => {
                                return <ShoesItem key={item.id} data={item} onClick={() => {
                                    setTypedInput('')
                                    setShow(false)
                                }}/>;
                            })}
                        </SearchProper>
                    </div>
                )}
                
                onClickOutside={() => {
                    setShow(false);
                }}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        className={cx('input-search')}
                        placeholder="search product..."
                        spellCheck={false}
                        value={typedInput}
                        onChange={(e) => {
                            setTypedInput(e.target.value);
                        }}
                        onClick={() => setShow(true)}
                    />

                    {!!typedInput && (
                        <p
                            className={cx('close')}
                            onClick={() => {
                                setTypedInput('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </p>
                    )}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
