/**
 * External dependencies
 */

const { Component, Fragment } = wp.element;

const { __, _x } = wp.i18n;

const {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	Toolbar,
	ToggleControl,
	Button,
	ButtonGroup,
	PanelRow,
	ExternalLink,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	RichText,
} = wp.editor;


class Browser_Shots extends Component {

	constructor() {

		super( ...arguments );

		this.state = {
			html: this.props.attributes.html,
			welcome: '' === this.props.attributes.url ? true : false,
			version: '1',
			url: this.props.attributes.url,
			width: this.props.attributes.width,
			height: this.props.attributes.height,
			alt: this.props.attributes.alt,
			link: this.props.attributes.link,
			target: this.props.attributes.target,
			classname: this.props.attributes.classname,
			rel: this.props.attributes.rel,
			image_class: this.props.attributes.image_class,
			image_size: this.props.attributes.image_size,
			display_link: 'undefined' === typeof this.props.attributes.display_link ? true : this.props.attributes.display_link,
			post_links: 'undefined' === typeof this.props.attributes.post_links ? false : this.props.attributes.post_links,
		};

	};


	/**
	 * Reload the image from the image server.
	 * This allows users to get rid of the 'generating screenshot' message.
	 */
	refresh = () => {

		const version = parseInt( this.state.version ) + 1;
		this.setState( { version } );

	};


	/**
	 * Update the app state when a new screenshot path is submitted.
	 */
	urlChange = ( event ) => {

		this.props.setAttributes( { url: event.target.value } );

		this.setState( { url: event.target.value } );

	};


	/**
	 * Create a preview image.
	 *
	 * This is a not a complete screenshot image as output by the shortcode. It
	 * simply has enough info to preview what will be output.
	 */
	createPreviewImage = () => {

		const { width, height, url } = this.props.attributes;
		let mshotsUrl = `https://s0.wp.com/mshots/v1/${encodeURI( url )}?w=${width}&h=${height}&version=${this.state.version}`;

		return (
			<div>
				<img src={mshotsUrl} alt={this.props.attributes.alt} width={width} height={height} />
			</div>
		);

	};


	render() {

		const { attributes } = this.props;
		const { width, height, alt, link, target, rel, image_size, content, display_link, post_links } = attributes;

		const relOptions = [
			{
				value: '',
				label: __( 'None', 'browser-shots' )
			},
			{
				value: 'nofollow',
				label: __( 'No Follow', 'browser-shots' )
			}
		];

		const resetSelect = [
			{
				icon: 'edit',
				title: __( 'Edit URL', 'browser-shots' ),
				onClick: () => this.setState( { welcome: true } )
			},
			{
				icon: 'update',
				title: __( 'Refresh Image', 'browser-shots' ),
				onClick: ( e ) => this.refresh()
			}
		];

		const inspectorControls = (

			<InspectorControls>

				<PanelBody title={__( 'Browser Shots Settings', 'browser-shots' )}>

					<TextareaControl
						label={__( 'Alt Text (Alternative Text)', 'browser-shots' )}
						value={alt}
						onChange={( value ) => { this.props.setAttributes( { alt: value } ); }}
						help={
							<div>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{__( 'Describe the purpose of the image', 'browser-shots' )}
								</ExternalLink>
								{__( 'Leave empty if the image is purely decorative.', 'browser-shots' )}
							</div>
						}
					/>

					<p>{__( 'Image Dimensions', 'browser-shots' )}</p>
					<PanelRow className="browser-shots-dimensions">
						<TextControl
							type="number"
							label={__( 'Width', 'browser-shots' )}
							value={width}
							min={100}
							max={1280}
							onChange={
								( value ) => {
									if ( value > 1280 ) {
										value = 1280;
									}
									this.props.setAttributes( { width: value, image_size: 'custom' } )
								}
							}
						/>
						<TextControl
							type="number"
							label={__( 'Height', 'browser-shots' )}
							value={height}
							min={100}
							max={960}
							onChange={
								( value ) => {
									if ( value > 960 ) {
										value = 960;
									}
									this.props.setAttributes( { height: value, image_size: 'custom' } )
								}
							}
						/>
					</PanelRow>

					<PanelRow className="browser-shots-dimensions-options">
						<ButtonGroup>
							<Button
								isDefault
								isPrimary={'small' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 320,
												height: 240,
												image_size: 'small',
											}
										);
									}
								}
							>
								{_x( 'S', 'Small Image Size', 'browser-shots' )}
							</Button>
							<Button
								isDefault
								isPrimary={'medium' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 640,
												height: 480,
												image_size: 'medium',
											}
										);
									}
								}
							>
								{_x( 'M', 'Medium Image Size', 'browser-shots' )}
							</Button>
							<Button
								isDefault
								isPrimary={'large' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 960,
												height: 720,
												image_size: 'large',
											}
										);
									}
								}
							>
								{_x( 'L', 'Large Image Size', 'browser-shots' )}
							</Button>
							<Button
								isDefault
								isPrimary={'full' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 1280,
												height: 960,
												image_size: 'full',
											}
										);
									}
								}
							>
								{_x( 'XL', 'Extra Large Image Size', 'browser-shots' )}
							</Button>
						</ButtonGroup>
						<Button
							isDefault
							onClick={
								( e ) => {
									this.props.setAttributes(
										{
											width: 600,
											height: 450,
											image_size: 'medium',
										}
									);
								}
							}
						>
							{_x( 'Reset', 'Reset Image Size to Default', 'browser-shots' )}
						</Button>
					</PanelRow>

					<Button
						onClick={( e ) => { this.refresh() }}
						isDefault
					>
						{__( 'Refresh Image', 'browser-shots' )}
					</Button>

				</PanelBody>

				<PanelBody title={__( 'Link Settings', 'browser-shots' )} initialOpen={false}>

					<ToggleControl
						label={__( 'Use link', 'browser-shots' )}
						onChange={
							( display_link ) => {
								this.props.setAttributes( { display_link: display_link } );
								this.setState( { display_link: display_link } );
							}
						}
						checked={this.state.display_link}
					/>

					{this.state.display_link &&
						<ToggleControl
							label={__( 'Link to the current post', 'browser-shots' )}
							onChange={
								( post_links ) => {
									this.props.setAttributes( { post_links } );
									this.setState( { post_links } );
								}
							}
							checked={this.state.post_links}
						/>
					}

					{this.state.display_link && !post_links &&
						<TextControl
							label={__( 'Link Image to URL', 'browser-shots' )}
							type="text"
							placeholder={this.state.url}
							value={link}
							onChange={( value ) => { this.props.setAttributes( { link: value } ); }}
							help={
								<div>
									{__( 'By default the image links to the screenshot url.', 'browser-shots' )}
								</div>
							}
						/>
					}
					{this.state.display_link &&
						<Fragment>
							<ToggleControl
								label={__( 'Open in New Tab', 'browser-shots' )}
								onChange={
									( value ) => {
										let linkTarget = value ? '_blank' : 'none';
										this.props.setAttributes( { target: linkTarget } );
									}
								}
								checked={target === '_blank'}
							/>

							<ToggleControl
								label={__( 'Set Nofollow', 'browser-shots' )}
								onChange={
									( value ) => {
										let linkRel = value ? 'nofollow' : '';
										this.props.setAttributes( { rel: linkRel } );
									}
								}
								checked={rel === 'nofollow'}
							/>
						</Fragment>
					}

				</PanelBody>
			</InspectorControls>
		);

		return (

			<Fragment>
				{this.state.welcome &&
					<PanelBody>
						<div className="browsershots-block">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
									<g fill="none" fill-rule="evenodd">
										<path fill="#000000" d="M18,5 L4,5 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 Z" />
										<path stroke="#000000" stroke-width="2" d="M16.6666667,8 L11.3333333,8 L10.5,10 L8,10 C7.44771525,10 7,10.4477153 7,11 L7,19 C7,19.5522847 7.44771525,20 8,20 L20,20 C20.5522847,20 21,19.5522847 21,19 L21,11 C21,10.4477153 20.5522847,10 20,10 L17.5,10 L16.6666667,8 Z" />
										<circle cx="14" cy="15" r="2" stroke="#000000" stroke-width="2" />
									</g>
								</svg>
							</div>
							<div>
								<label htmlFor="browser-shots-url">{__( 'Enter a URL', 'browser-shots' )}</label>
							</div>
							<div>
								<input type="text"
									id="browser-shots-url"
									value={this.state.url}
									placeholder="https://"
									onChange={
										( event ) => {
											this.urlChange( event );
										}
									}
								/>
							</div>
							<div>
								<input
									className="button button-primary"
									style={{ marginTop: '25px' }}
									type="submit" id="browsershots-input-submit"
									value={__( 'Load Image', 'browser-shots' )}
									onClick={
										() => {
											if ( '' !== this.props.attributes.url ) {
												this.setState( { welcome: false } );
											}
										}
									}
								/>
							</div>
						</div>
					</PanelBody>
				}

				{!this.state.welcome &&

					<Fragment>
						{inspectorControls}
						<BlockControls>
							<Toolbar controls={resetSelect} />
						</BlockControls>
						<div
							className={'browser-shots-gutenberg-wrapper'}
							style={
								{
									overflow: 'hidden',
									maxWidth: '100%',
								}
							}
						>
							{this.createPreviewImage()}
							<RichText
								tagName="div"
								className='wp-caption-text'
								placeholder={__( 'Write caption...', 'browser-shots' )}
								value={content}
								onChange={( content ) => this.props.setAttributes( { content: content } )}
							/>
						</div>
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default Browser_Shots;
