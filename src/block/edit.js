/**
 * External dependencies
 */
import axios from 'axios';
var HtmlToReactParser = require('html-to-react').Parser;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	RangeControl,
	Toolbar,
	Button,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
} = wp.editor;


class Browser_Shots extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			html: this.props.attributes.html,
			loading: '' === this.props.attributes.url ? true : false,
			imageLoading: false,
			url: this.props.attributes.url,
			width: this.props.attributes.width,
			height: this.props.attributes.height,
			alt: this.props.attributes.alt,
			link: this.props.attributes.link,
			target: this.props.attributes.target,
			classname: this.props.attributes.classname,
			image_class: this.props.attributes.image_class,
			rel: this.props.attributes.rel,
		};
	}

	slugChange = (event) => {
		this.setState( {
			slug: event.target.value
		} );
	}

	typeChange = (event) => {
		this.setState( {
			type: event.target.value
		} );
	}

	pluginOnClick = (event) => {
		if( '' !== this.state.url ) {
			this.setState( {
				imageLoading: true,
				loading: false,
			} );
			var rest_url = browsershots.rest_url + 'browsershots/v1/get_html/';
			axios.get(rest_url + `?url=${this.props.attributes.url}&width=${this.props.attributes.width}&height=${this.props.attributes.height}&alt=${this.props.attributes.alt}&link=${this.props.attributes.link}&target=${this.props.attributes.target}&class=${this.props.attributes.classname}&image_class=${this.props.attributes.image_class}&rel=${this.props.attributes.rel}`, { 'headers': { 'X-WP-Nonce': browsershots.nonce } } ).then( ( response ) => {
				// Now Set State
				this.setState( {
					loading: false,
					imageLoading: false,
					html: response.data
				} );
				this.props.setAttributes({html: response.data});
			} );
		}
	}

	urlChange = (event) => {
		this.setState( {
			url: event.target.value
		} );
	}

	render() {
		const { attributes } = this.props;
		const { url, width, height, alt, link, target, classname, image_class, rel} = attributes;
		let htmlToReactParser = new HtmlToReactParser();

		const targetOptions = [
			{ value: '_self', label: __('None', 'browser-shots' ) },
			{ value: '_blank', label: __('Blank', 'browser-shots' ) },
			{ value: '_parent', label: __('Parent', 'browser-shots' ) },
			{ value: '_self', label: __('Self', 'browser-shots' ) },
			{ value: '_top', label: __('Top', 'browser-shots' ) }
		];

		const alignOptions = [
			{ value: 'alignnone', label: __('None', 'browser-shots' ) },
			{ value: 'alignleft', label: __('Left', 'browser-shots' ) },
			{ value: 'aligncenter', label: __('Center', 'browser-shots' ) },
			{ value: 'alignright', label: __('Right', 'browser-shots' ) }
		];

		const relOptions = [
			{ value: '', label: __('None', 'browser-shots' ) },
			{ value: 'nofollow', label: __('No Follow', 'browser-shots' ) }
		];

		const resetSelect = [
			{
				icon: 'update',
				title: __( 'Reset', 'browser-shots' ),
				onClick: () => this.setState( { loading: true } )
			}
		];

		const pluginOnClick = this.pluginOnClick;
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Browser Shots', 'browser-shots' ) }>
					<RangeControl
						label={__('Width', 'browser-shots')}
						value={ width }
						onChange={ ( value ) => { this.props.setAttributes( { width: value } ); } }
						min={ 100 }
						max={ 1000 }
					/>
					<RangeControl
						label={__('Height', 'browser-shots')}
						value={ height }
						onChange={ ( value ) => { this.props.setAttributes( { height: value } ); } }
						min={ 100 }
						max={ 1000 }
					/>
					<TextControl
						label={ __( 'Alt Text',  'browser-shots' ) }
						type="text"
						value={ alt }
						onChange={ ( value ) => { this.props.setAttributes( { alt: value });  } }
					/>
					<TextControl
						label={ __( 'Link Image to URL',  'browser-shots' ) }
						type="text"
						value={ link }
						onChange={ ( value ) => { this.props.setAttributes( { link: value });  } }
					/>
					<SelectControl
							label={ __( 'Target', 'browser-shots' ) }
							options={ targetOptions }
							value={ target }
							onChange={ ( value ) => { this.props.setAttributes( { target: value } ); } }
					/>
					<TextControl
						label={ __( 'CSS Class Name',  'browser-shots' ) }
						type="text"
						value={ classname }
						onChange={ ( value ) => { this.props.setAttributes( { classname: value });  } }
					/>
					<SelectControl
							label={ __( 'Image Alignment', 'browser-shots' ) }
							options={ alignOptions }
							value={ image_class }
							onChange={ ( value ) => { this.props.setAttributes( { image_class: value } ); } }
					/>
					<SelectControl
							label={ __( 'Rel', 'browser-shots' ) }
							options={ relOptions }
							value={ rel }
							onChange={ ( value ) => { this.props.setAttributes( { rel: value } ); } }
					/>
					<Button
						onClick={ ( e ) => { this.pluginOnClick(e)  } }
						isDefault
					>
						{ __( 'Refresh Image',  'browser-shots' ) }
					</Button>

				</PanelBody>
			</InspectorControls>
		);
		return(
			<Fragment>
				<Fragment>
					{this.state.loading &&
						<Placeholder>
							<div className="browsershots-block">
								<div>
									<label htmlFor="browser-shots-url">{__( 'Enter a URL', 'browser-shots' )}</label>
								</div>
								<div>
									<input type="text" id="browser-shots-url" value={this.state.url} onChange={ ( event ) => { this.props.setAttributes( { url: event.target.value } ); this.urlChange(event); } } />
								</div>
								<div>
									<input className="button button-primary" style={{marginTop: '25px'}} type="submit" id="browsershots-input-submit" value={__( 'Find Image', 'browser-shots' )} onClick={ ( event ) => { this.pluginOnClick(event); } }  />
								</div>
							</div>
						</Placeholder>
					}
					{this.state.imageLoading &&
						<Placeholder>
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
								<g fill="none" fill-rule="evenodd">
									<path fill="#000000" d="M18,5 L4,5 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 Z"/>
									<path stroke="#000000" stroke-width="2" d="M16.6666667,8 L11.3333333,8 L10.5,10 L8,10 C7.44771525,10 7,10.4477153 7,11 L7,19 C7,19.5522847 7.44771525,20 8,20 L20,20 C20.5522847,20 21,19.5522847 21,19 L21,11 C21,10.4477153 20.5522847,10 20,10 L17.5,10 L16.6666667,8 Z"/>
									<circle cx="14" cy="15" r="2" stroke="#000000" stroke-width="2"/>
								</g>
								</svg>
							</div>
						</Placeholder>
					}
					{!this.state.loading && !this.state.imageLoading &&
						<Fragment>
							{inspectorControls}
							<BlockControls>
								<Toolbar controls={ resetSelect } />
							</BlockControls>
							<div className="browser-shots-gutenberg-wrapper" style={{textAlign: 'aligncenter' == image_class ? 'center' : ''}}>
								{htmlToReactParser.parse(this.state.html)}
							</div>
						</Fragment>
					}
				</Fragment>
			</Fragment>
		);
	}
}

export default Browser_Shots;
