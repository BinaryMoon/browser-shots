/**
 * BLOCK: Browser Shots
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import edit from './edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks


/**
 * Register: A Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'browser-shots/browser-shots',
	{

		title: __( 'Browser Shots', 'browser-shots' ),
		description: __( 'Automatically embed screenshots of websites onto your site.', 'browser-shots' ),
		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<g fill-rule="evenodd">
				<path d="M18,5 L4,5 L4,19 L2,19 L2,5 C2,3.8954305 2.8954305,3 4,3 L18,3 L18,5 Z" />
				<path fill-rule="nonzero" d="M10,9 L11,7 L17,7 L18,9 L20,9 C21.1045695,9 22,9.8954305 22,11 L22,19 C22,20.1045695 21.1045695,21 20,21 L8,21 C6.8954305,21 6,20.1045695 6,19 L6,11 C6,9.8954305 6.8954305,9 8,9 L10,9 Z M12,9 L11,11 L8,11 L8,19 L20,19 L20,11 L17,11 L16,9 L12,9 Z" />
				<path fill-rule="nonzero" d="M14,18 C15.6568542,18 17,16.6568542 17,15 C17,13.3431458 15.6568542,12 14,12 C12.3431458,12 11,13.3431458 11,15 C11,16.6568542 12.3431458,18 14,18 Z M14,16 C13.4477153,16 13,15.5522847 13,15 C13,14.4477153 13.4477153,14 14,14 C14.5522847,14 15,14.4477153 15,15 C15,15.5522847 14.5522847,16 14,16 Z" />
			</g>
		</svg>
		,
		className: 'browser-shots-block',
		category: 'embed',
		keywords: [
			__( 'Browser Shots', 'browser-shots' ),
			__( 'website', 'browser-shots' ),
			__( 'screenshot', 'browser-shots' )
		],
		edit: edit,
		supports: {
			align: [ 'left', 'center', 'right' ],
		},

		// Rendered via PHP.
		save() {
			return null;
		},

	}
);

