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
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	AlignmentToolbar,
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
				imageLoading: true
			} );
			var rest_url = browsershots.rest_url + 'browsershots/v1/get_html/';
			axios.get(rest_url + `?url=${this.props.attributes.url}&width=${this.props.attributes.width}&height=${this.props.attributes.height}&alt=${this.props.attributes.alt}&link=${this.props.attributes.link}&target=${this.props.attributes.target}&class=${this.props.attributes.classname}&image_class=${this.props.attributes.image_class}&rel=${this.props.attributes.rel}` ).then( ( response ) => {
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
			{ value: '_blank', label: __('Blank', 'browsershots' ) },
			{ value: '_parent', label: __('Parent', 'browsershots' ) },
			{ value: '_self', label: __('Self', 'browsershots' ) },
			{ value: '_top', label: __('Top', 'browsershots' ) }
		];

		const resetSelect = [
			{
				icon: 'update',
				title: __( 'Reset', 'browsershots' ),
				onClick: () => this.setState( { loading: true } )
			}
		];

		const pluginOnClick = this.pluginOnClick;
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Browser Shots', 'browsershots' ) }>
					<RangeControl
						label={__('Width', 'browsershots')}
						value={ width }
						onChange={ ( value ) => { this.props.setAttributes( { width: value } ); } }
						min={ 100 }
						max={ 1000 }
					/>
					<RangeControl
						label={__('Height', 'browsershots')}
						value={ height }
						onChange={ ( value ) => { this.props.setAttributes( { height: value } ); } }
						min={ 100 }
						max={ 1000 }
					/>
					<TextControl
						label={ __( 'Alt Text',  'browsershots' ) }
						type="text"
						value={ alt }
						onChange={ ( value ) => { this.props.setAttributes( { alt: value });  } }
					/>
					<TextControl
						label={ __( 'Link Image to URL',  'browsershots' ) }
						type="text"
						value={ link }
						onChange={ ( value ) => { this.props.setAttributes( { link: value });  } }
					/>
					<SelectControl
							label={ __( 'Target', 'wp-plugin-info-card' ) }
							options={ targetOptions }
							value={ target }
							onChange={ ( value ) => { this.props.setAttributes( { target: value } ); } }
					/>
					<TextControl
						label={ __( 'CSS Class Name',  'browsershots' ) }
						type="text"
						value={ classname }
						onChange={ ( value ) => { this.props.setAttributes( { classname: value });  } }
					/>
					<TextControl
						label={ __( 'Image Class',  'browsershots' ) }
						type="text"
						value={ image_class }
						onChange={ ( value ) => { this.props.setAttributes( { image_class: value });  } }
					/>
					<TextControl
						label={ __( 'Rel Attribute',  'browsershots' ) }
						type="text"
						value={ rel }
						onChange={ ( value ) => { this.props.setAttributes( { rel: value });  } }
					/>

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
									<h3><label htmlFor="browser-shots-url">{__( 'Enter a URL', 'wp-plugin-info-card' )}</label></h3>
								</div>
								<div>
									<input type="text" id="browser-shots-url" value={this.state.url} onChange={ ( event ) => { this.props.setAttributes( { url: event.target.value } ); this.urlChange(event); } } />
								</div>
								<div>
									<input className="button button-primary" style={{marginTop: '25px'}} type="submit" id="browsershots-input-submit" value={__( 'Find Image', 'browsershots' )} onClick={ ( event ) => { this.pluginOnClick(event); } }  />
								</div>
							</div>
						</Placeholder>
					}
					{this.state.imageLoading &&
						<Placeholder>
							<Spinner />
						</Placeholder>
					}
					{!this.state.loading && !this.state.imageLoading &&
						<Fragment>
							{inspectorControls}
							<BlockControls>
								<Toolbar controls={ resetSelect } />
							</BlockControls>
							<div>
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
