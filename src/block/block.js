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
 * Register: aa Gutenberg Block.
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
registerBlockType( 'browser-shots/browser-shots', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Browser Shots', 'browsershots' ), // Block title.
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<g fill="none" fill-rule="evenodd">
	  <path fill="#000000" d="M18,5 L4,5 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 Z"/>
	  <path stroke="#000000" stroke-width="2" d="M16.6666667,8 L11.3333333,8 L10.5,10 L8,10 C7.44771525,10 7,10.4477153 7,11 L7,19 C7,19.5522847 7.44771525,20 8,20 L20,20 C20.5522847,20 21,19.5522847 21,19 L21,11 C21,10.4477153 20.5522847,10 20,10 L17.5,10 L16.6666667,8 Z"/>
	  <circle cx="14" cy="15" r="2" stroke="#000000" stroke-width="2"/>
	</g>
  </svg>
  ,
	className: 'browser-shots-block',
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Browser Shots', 'browsershots' ),
		__( 'website', 'browsershots' ),
	],
	edit: edit,

	// Render via PHP
	save() {
		return null;
	},
} );
