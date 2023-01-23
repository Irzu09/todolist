import CheckboxIcon from '../assets/checkbox.svg';
import MoreIcon from '../assets/more.svg';
import AddIcon from '../assets/add.svg';
import { useEffect, useRef } from 'react';

function Section2({ list, add, setAdd, more, setMore, editList, setEditList, childMore, setChildMore }) {
    let refMore = useRef(null);
    let refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, []);

    const handleClickOutside = (e) => {
        refs.filter((refs, index) => {
            if (refs.current && !refs.current.contains(e.target)) {
                const x = [...childMore];
                x[index] = false;
                setChildMore(x);
            }
        })

        if (refMore && !refMore.current.contains(e.target)) setMore(false);
    }

    return (
        <div className='Box'>
            <div className='d-flex justify-content-between Sect1'>
                <div>To Do List</div>
                <div>
                    <div className='d-flex flex-row'>
                        <div className='d-flex Cursor-pointer'>
                            <img src={AddIcon} className='pr-2' alt='add icon' onClick={() => setAdd(!add)} />
                        </div>
                        <div className='position-relative d-flex Cursor-pointer'>
                            <img src={MoreIcon} className='pl-1 pr-2' alt='more icon' ref={refMore} onClick={() => setMore(!more)} />

                            {more &&
                                <div className='MoreDropdownContainer'>
                                    <div className='MoreDropdown'>
                                        Delete Entire List
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className='Divider'></div>
            <div className='Sect2'>
                {list.map((list, index) =>
                    <div key={list.id} className='List d-flex flex-row justify-content-between'>
                        {editList[index] ?
                            <input className='InputSearch' defaultValue={list.subject} autoFocus></input>
                            : <div>{list.subject}</div>
                        }

                        <div className='d-flex flex-row'>
                            <div className='Cursor-pointer'>
                                <img src={CheckboxIcon} alt='checkbox icons' />
                            </div>
                            <div className='position-relative Cursor-pointer'>
                                <img src={MoreIcon} className='pr-1 pl-2' alt='more icon' ref={refs[index]}
                                    onClick={() => {
                                        const x = [...childMore];
                                        x[index] = !childMore[index];
                                        setChildMore(x);
                                        console.log(x);
                                        console.log(childMore);
                                    }}
                                />

                                {childMore[index] &&
                                    <div className='ChildMoreDropdownContainer'>
                                        <div className='ChildMoreDropdown' id='EditIcon'
                                            onClick={() => {
                                                const x = [...editList];
                                                x[index] = !editList[index];
                                                setEditList(x);
                                            }}
                                        >
                                            Edit Item
                                        </div>
                                        <div className='ChildMoreDropdown' id='DeleteIcon'>
                                            Delete Item
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                )}
            </div>

            {add &&
                <div>
                    <input type='search' className='InputSearch' placeholder='What needs to be done?' autoFocus />
                    <div className='Buttons'>
                        <button className='mr-2 ButtonCreate'>Create</button>
                        <button className='ButtonCancel'>Cancel</button>
                    </div>
                </div>
            }

            <div className='Footer'>Don't miss out an importance tasks anymore</div>
        </div>
    )
}

export default Section2;