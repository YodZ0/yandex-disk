import { SlCloudDownload } from 'react-icons/sl';

import Button from '../../components/Button/Button.jsx';
import WLink from '../../components/WLink/WLink.jsx';

import './ContentTable.css';

export default function ContentTable({ data }) {

    const { title, public_url, modified_at, items } = data;

    return (
        <table className="table">
            <caption className="table-name">
                <div className="tabel-name-container">
                    <span>Name: {title}</span>
                    <span>URL: <a className="source-link" href={public_url}>{public_url}</a></span>
                    <span>Modified: {modified_at}</span>
                </div>
            </caption>
            <thead>
                <tr>
                    <th className="column w-30">Title</th>
                    <th className="column w-10">Media type</th>
                    <th className="column w-20">Public url</th>
                    <th className="column w-20">Last update</th>
                    <th className="column w-10">Type</th>
                    <th className="column w-10">Download</th>
                </tr>
            </thead>
            <tbody>
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <tr key={index}>
                            <td className="column left">{item.title}</td>
                            <td className="column center">{item.media_type || 'N/A'}</td>
                            <td className="column center">
                                {item.public_url ? (
                                    <a
                                        className="item-link"
                                        href={item.public_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View source
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td className="column center">{item.modified_at}</td>
                            <td className="column center">{item.typ || 'N/A'}</td>
                            <td className="column center">
                                {item.download_link ? (
                                    <WLink url={item.download_link}>
                                        <Button
                                            icon={<SlCloudDownload />}
                                            onClick={() => { }}
                                        />
                                    </WLink>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="column center">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};