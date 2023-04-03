import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../common/enums-and-constants/routes-enum';
import { useAppSelector } from '../../common/hooks/use-app-selector';
import { booksSelectors } from '../../store/books';
import { Menu, MenuItem, MenuSubItem } from '../../ui/menu';

import style from './navigation.module.css';

type Props = {
  dataTestIdType: string;
  dataTestIdShowCase: string;
  dataTestIdTerms: string;
  dataTestIdContract: string;
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
};

export const Navigation = memo(
  ({
    dataTestIdType,
    dataTestIdShowCase,
    dataTestIdTerms,
    dataTestIdContract,
    collapsed = false,
    setCollapsed,
  }: Props) => {
    const { pathname } = useLocation();
    const categories = useAppSelector(booksSelectors.selectCategories);

    const [categoriesCollapsed, setCategoriesCollapsed] = useState(
      !(pathname.toLowerCase().includes(ROUTES.BOOKS.toLowerCase()) || pathname === '/')
    );

    const localCollapsedClick = useCallback((value: boolean) => {
      setCategoriesCollapsed(value);
    }, []);

    useEffect(() => {
      if (pathname.toLowerCase().includes(ROUTES.BOOKS.toLowerCase()) || pathname === '/') {
        if (setCollapsed) {
          setCollapsed(false);
        } else {
          setCategoriesCollapsed(false);
        }
      } else if (setCollapsed) {
        setCollapsed(true);
      } else {
        setCategoriesCollapsed(true);
      }
    }, [setCollapsed, pathname]);

    return (
      <Menu className={style.container}>
        <MenuItem
          dataTestId={dataTestIdShowCase}
          title='Ветрина книг'
          path={`${ROUTES.BOOKS}/all`}
          basedPath={ROUTES.BOOKS}
          collapsed={collapsed ? collapsed : categoriesCollapsed}
          onClickAccordion={setCollapsed ? setCollapsed : localCollapsedClick}
        >
          {categories.map((el, index) => {
            if (index === 0) {
              return (
                <Fragment key={el.id}>
                  <MenuSubItem dataTestId={`${dataTestIdType}-books`} title='Все книги' path={`${ROUTES.BOOKS}/all`} />
                  <MenuSubItem
                    dataTestIdType={dataTestIdType}
                    dataTestIdCategory={el.path}
                    title={el.name}
                    path={`/books/${el.path}`}
                    count={el.count}
                  />
                </Fragment>
              );
            }

            return (
              <MenuSubItem
                key={el.id}
                dataTestIdType={dataTestIdType}
                dataTestIdCategory={el.path}
                title={el.name}
                path={`${ROUTES.BOOKS}/${el.path}`}
                count={el.count}
              />
            );
          })}
        </MenuItem>
        <MenuItem dataTestId={dataTestIdTerms} path={ROUTES.TERMS} basedPath='' title='Правила пользования' />
        <MenuItem basedPath='' dataTestId={dataTestIdContract} path={ROUTES.CONTRACT} title='Договор оферты' />
      </Menu>
    );
  }
);
